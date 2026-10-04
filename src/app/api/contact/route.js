import nodemailer from "nodemailer";
import connectDB from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import { esc } from "@/lib/adminAuth";

export async function POST(req) {
  try {
    const { name, email, message, phone } = await req.json();

    if (!name || !email || !message) {
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
