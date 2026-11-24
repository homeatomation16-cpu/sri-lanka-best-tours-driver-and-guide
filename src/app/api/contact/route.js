import nodemailer from "nodemailer";
import connectDB from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import { esc } from "@/lib/adminAuth";
import { clientIp, isEmail, rateLimited } from "@/lib/customerAuth";

export async function POST(req) {
  try {
    if (rateLimited(`contact:${clientIp(req)}`, 5, 3600000)) {
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
    try {
      await connectDB();
      await Inquiry.create({ type: "contact", name, email, phone, message });
    } catch (dbError) {
      console.error("Inquiry save failed:", dbError);
    }

    // 2) E-mail notification
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });

      await transporter.sendMail({
        from: `"Website Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `New Contact Message from ${String(name).replace(/[\r\n]/g, " ")}`,
        html: `
          <h2>Contact Message</h2>
          <p><strong>Name:</strong> ${esc(name)}</p>
          <p><strong>Email:</strong> ${esc(email)}</p>
          <p><strong>Message:</strong></p>
          <p>${esc(message)}</p>
        `,
      });
    } catch (mailError) {
      console.error("Contact email failed:", mailError);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}
