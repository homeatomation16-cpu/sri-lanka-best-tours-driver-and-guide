import nodemailer from "nodemailer";
import connectDB from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import { esc } from "@/lib/adminAuth";

export async function POST(req) {
  try {
    const body = await req.json();

    // Save to CRM first so the request is never lost even if e-mail fails
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
    } catch (dbError) {
      console.error("Inquiry save failed:", dbError);
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Sri Lanka Tours Driver" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
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

    // Confirmation email to customer
    await transporter.sendMail({
      from: `"Sri Lanka Tours Driver" <${process.env.EMAIL_USER}>`,
      to: body.email,
      subject: "Your Tailor Made Tour Request Received",
      html: `
        <h2>Thank you ${esc(body.name)}!</h2>
        <p>We received your tailor-made tour request.</p>
        <p>Our team will contact you shortly via WhatsApp or Email.</p>
        <br/>
        <p>Best Regards,<br/>Sri Lanka Tours Driver</p>
      `,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}