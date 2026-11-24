import { emailLayout, notifyAdmins, sendEmail } from "@/lib/email";
import connectDB from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import { esc } from "@/lib/adminAuth";
import { clientIp, isEmail, rateLimited } from "@/lib/customerAuth";

export async function POST(req) {
  try {
    if (await rateLimited(`contact:${clientIp(req)}`, 5, 3600000)) {
      return Response.json({ success: false }, { status: 429 });
    }
    const body = await req.json();
    // Plain strings with sensible length caps; nothing is saved without a name, a valid e-mail and a message.
    const name = String(body.name || "").trim().slice(0, 120);
    const email = String(body.email || "").trim().slice(0, 254);
    const phone = String(body.phone || "").trim().slice(0, 40);
    const message = String(body.message || "").trim().slice(0, 5000);

    if (!name || !isEmail(email) || !message) {
      return Response.json({ success: false }, { status: 400 });
    }

    // 1) Save to CRM first so the message is never lost
    let saved = false;
    try {
      await connectDB();
      await Inquiry.create({ type: "contact", name, email, phone, message });
      saved = true;
    } catch (dbError) {
      console.error("Inquiry save failed:", dbError);
    }

    // 2) E-mail notification (sendEmail returns false instead of throwing)
    let notified = false;
    try {
      notified = await notifyAdmins({
        replyTo: email,
        subject: `New Contact Message from ${String(name).replace(/[\r\n]/g, " ")}`,
        html: `
          <h2>Contact Message</h2>
          <p><strong>Name:</strong> ${esc(name)}</p>
          <p><strong>Email:</strong> ${esc(email)}</p>
          <p><strong>Phone:</strong> ${esc(phone || "-")}</p>
          <p><strong>Message:</strong></p>
          <p>${esc(message)}</p>
        `,
      });
    } catch (mailError) {
      console.error("Contact email failed:", mailError);
    }

    // Acknowledgement to the visitor (separate message; admin addresses are never shown to them)
    if (notified || saved) {
      try {
        await sendEmail({
          to: email,
          subject: "We received your message",
          html: await emailLayout("We received your message", `<p>Hello ${esc(name)},</p><p>Thank you for contacting us. We will reply by e-mail or WhatsApp as soon as possible.</p>`),
        });
      } catch (mailError) {
        console.error("Contact acknowledgement failed:", mailError?.message || mailError);
      }
    }

    // Success only if the message reached us one way or the other; otherwise the visitor must retry.
    if (!saved && !notified) return Response.json({ success: false }, { status: 500 });
    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}
