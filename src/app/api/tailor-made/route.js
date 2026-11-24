import connectDB from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import { esc } from "@/lib/adminAuth";
import { clientIp, isEmail, rateLimited } from "@/lib/customerAuth";
import { emailLayout, emailText, notifyAdmins, sendEmail } from "@/lib/email";

export async function POST(req) {
  try {
    if (await rateLimited(`tailor-made:${clientIp(req)}`, 5, 3600000)) {
      return Response.json({ success: false }, { status: 429 });
    }
    const body = await req.json();
    // Same rule as the contact form: nothing is saved or e-mailed without a name and a valid e-mail address.
    if (typeof body?.name !== "string" || !body.name.trim() || body.name.length > 120 || !isEmail(body.email) || JSON.stringify(body).length > 20000) {
      return Response.json({ success: false }, { status: 400 });
    }

    // Save to CRM first so the request is never lost even if e-mail fails
    let saved = false;
    try {
      await connectDB();
      await Inquiry.create({
        type: "tailor-made",
        name: body.name,
        email: body.email,
        phone: body.whatsapp,
        message: body.additionalRequirements,
        data: body,
      });
      saved = true;
    } catch (dbError) {
      console.error("Inquiry save failed:", dbError);
    }

    // E-mails are best-effort: the request is already saved, so a mail failure must not
    // show the customer an error (they would send the same request again).
    let notified = false;
    try {
    notified = await notifyAdmins({
      replyTo: body.email,
      subject: `🌴 New Tailor Made Tour Request`,
      html: `
        <h2>Tailor Made Tour Request</h2>

        <h3>Customer Details</h3>
        <p><strong>Name:</strong> ${esc(body.name)}</p>
        <p><strong>Email:</strong> ${esc(body.email)}</p>
        <p><strong>WhatsApp:</strong> ${esc(body.whatsapp)}</p>

        <h3>Travel Preferences</h3>
        <p><strong>Style:</strong> ${esc(body.travelStyle)}</p>
        <p><strong>Vehicle:</strong> ${esc(body.vehicleType)}</p>
        <p><strong>Transport:</strong> ${esc(body.transportMethod)}</p>

        <h3>Holiday Types</h3>
        <p>${esc(body.holidayType?.join(", "))}</p>

        <h3>Accommodation</h3>
        <p><strong>Type:</strong> ${esc(body.accommodation)}</p>
        <p><strong>Meal Plan:</strong> ${esc(body.mealPlan || "-")}</p>

        <h3>Travelers</h3>
        <p>Adults: ${esc(body.adults)}</p>
        <p>Children: ${esc(body.children)}</p>

        <h3>Dates</h3>
        <p>From: ${esc(body.startDate)}</p>
        <p>To: ${esc(body.endDate)}</p>
        <p>Duration: ${esc(body.estimatedDays)} days</p>

        <h3>Additional Requirements</h3>
        <p>${esc(body.additionalRequirements || "-")}</p>
      `,
    });

    // Confirmation email to customer (branded layout + signature)
    const t = await emailText(body.locale);
    await sendEmail({
      to: body.email,
      subject: t("tailorSubject"),
      html: await emailLayout(t("tailorSubject"), `<p>${esc(t("hello", { name: body.name }))}</p><p>${esc(t("tailorBody"))}</p>`, undefined, body.locale),
    });
    } catch (mailError) {
      console.error("Tailor-made e-mail failed:", mailError);
    }

    if (!saved && !notified) return Response.json({ success: false }, { status: 500 });
    return Response.json({ success: true });

  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}