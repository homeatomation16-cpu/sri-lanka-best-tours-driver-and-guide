// Shared e-mail helpers: one SMTP transport (the business cPanel mailbox), the branded layout and the signature.
// Everything comes from the environment; nothing is hard-coded:
//   SMTP_HOST, SMTP_PORT (465), SMTP_SECURE (true for 465), SMTP_USER, SMTP_PASS
//   SMTP_FROM                  sender, e.g. "Sri Lanka Best Tours Driver & Guide <info@…>" (default: SMTP_USER)
//   ADMIN_EMAIL                main address for booking / enquiry notifications (default: SMTP_USER)
//   ADMIN_NOTIFICATION_EMAILS  more notification addresses, comma-separated
import nodemailer from "nodemailer";
import { getSiteSettings, type SiteSettings } from "@/lib/siteSettings";
import { esc } from "@/lib/adminAuth";

export const BRAND = "Sri Lanka Best Tours Driver & Guide";
export const SITE_URL = (process.env.SITE_URL || "https://srilankabesttourdriverandguide.com").replace(/\/$/, "");

const isAddress = (value: string) => value.length <= 254 && /^[^\s@,;<>"]+@[^\s@,;<>"]+\.[^\s@,;<>"]+$/.test(value);
const port = Number(process.env.SMTP_PORT) || 465;
// A bare address in SMTP_FROM gets the brand name: "Sri Lanka Best Tours Driver & Guide" <info@…>
const fromAddress = (process.env.SMTP_FROM || process.env.SMTP_USER || "").replace(/[\r\n]/g, "").trim();
const from = fromAddress.includes("<") ? fromAddress : `"${BRAND}" <${fromAddress}>`;

/** Valid, de-duplicated notification addresses from ADMIN_EMAIL + ADMIN_NOTIFICATION_EMAILS. */
export function adminRecipients(env: Record<string, string | undefined> = process.env) {
  const list = [env.ADMIN_EMAIL || env.SMTP_USER || "", ...(env.ADMIN_NOTIFICATION_EMAILS || "").split(",")]
    .map((address) => address.trim().toLowerCase())
    .filter(Boolean);
  const invalid = list.filter((address) => !isAddress(address));
  if (invalid.length) console.error(`Ignoring ${invalid.length} invalid notification address(es)`);
  return [...new Set(list.filter(isAddress))];
}

// TLS certificates are verified (Nodemailer's default); `secure` is TLS from the start (port 465).
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

/** "Best regards" block with logo, phone, WhatsApp, e-mail, website and social links (inline styles for e-mail clients). */
export function emailSignature(contact: SiteSettings) {
  const BRAND = contact.brand;
  const SOCIAL: [string, string][] = [
    ["Facebook", contact.social.facebook],
    ["Instagram", contact.social.instagram],
    ["YouTube", contact.social.youtube],
    ["Tripadvisor", contact.social.tripadvisor],
  ];
  const host = new URL(SITE_URL).hostname;
  const social = SOCIAL.filter(([, url]) => url)
    .map(([label, url]) => `<a href="${esc(url)}" style="color:#009f91;text-decoration:none">${label}</a>`)
    .join(" &middot; ");
  const html = `<div style="margin-top:24px;font-family:Arial,sans-serif;font-size:14px;line-height:1.55;color:#334155">
<p style="margin:0 0 12px">Best regards,</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="padding-right:12px;vertical-align:top"><a href="${esc(SITE_URL)}"><img src="${esc(SITE_URL)}/logo.png" alt="${esc(BRAND)} logo" width="56" style="display:block;width:56px;height:auto;border:0"></a></td>
<td style="vertical-align:top"><strong style="font-size:16px;color:#032d55">${esc(BRAND)}</strong><br>
<span style="color:#475569">${esc(contact.address)}</span><br>
<a href="tel:${esc(contact.phone)}" style="color:#009f91;text-decoration:none">Voice/WhatsApp: ${esc(contact.phone)}</a><br>
<a href="mailto:${esc(contact.email)}" style="color:#009f91;text-decoration:none">${esc(contact.email)}</a><br>
<a href="${esc(SITE_URL)}" style="color:#009f91;text-decoration:none">Web: ${esc(host)}</a><br>
<a href="${esc(contact.whatsappme)}" style="color:#009f91;text-decoration:none">WhatsApp</a></td>
</tr>${social ? `<tr><td colspan="2" style="padding-top:10px"><span style="color:#475569;font-size:13px">Follow us: </span>${social}</td></tr>` : ""}</table></div>`;
  const text = `Best regards,\n${BRAND}\n${contact.address}\nVoice/WhatsApp: ${contact.phone}\nEmail: ${contact.email}\nWeb: ${SITE_URL}\nWhatsApp: ${contact.whatsappme}`;
  return { html, text };
}

/** Wraps already-escaped body HTML in the branded card and adds the signature. */
export async function emailLayout(title: string, bodyHtml: string, button?: { label: string; url: string }) {
  const contact = await getSiteSettings();
  const BRAND = contact.brand;
  const sig = emailSignature(contact);
  const cta = button
    ? `<p style="margin:28px 0"><a href="${esc(button.url)}" style="display:inline-block;background:#0b2a22;color:#fff;padding:14px 28px;border-radius:999px;text-decoration:none;font-weight:bold">${esc(button.label)}</a></p>`
    : "";
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;background:#f6f3ec;font-family:Arial,sans-serif">
<div style="max-width:560px;margin:32px auto;background:#fff;border-radius:18px;overflow:hidden;border:1px solid #ece6da">
<div style="background:#0b2a22;padding:28px 32px;color:#fbbf24;font-weight:bold;letter-spacing:.15em;text-transform:uppercase;font-size:13px">${esc(BRAND)}</div>
<div style="padding:32px;color:#334155;font-size:15px;line-height:1.6"><h1 style="margin:0 0 16px;font-size:22px;color:#0f172a">${esc(title)}</h1>${bodyHtml}${cta}${sig.html}</div>
</div></body></html>`;
}

/** Sends one mail from the business address. Returns false (and logs) instead of throwing when SMTP fails. */
export async function sendEmail({ to, subject, html, text, replyTo }: { to: string; subject: string; html: string; text?: string; replyTo?: string }) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("E-mail not sent: SMTP_HOST / SMTP_USER / SMTP_PASS are not configured");
    return false;
  }
  if (!isAddress(String(to || "").trim())) {
    console.error("E-mail not sent: invalid recipient");
    return false;
  }
  try {
    await transporter.sendMail({
      from,
      to: to.trim(),
      subject: subject.replace(/[\r\n]/g, " "),
      html,
      text,
      replyTo: replyTo && isAddress(replyTo.trim()) ? replyTo.trim() : undefined,
    });
    return true;
  } catch (error: any) {
    console.error("E-mail failed:", error?.code || error?.message || error);
    return false;
  }
}

/**
 * Business notification (new booking, enquiry, status change) to every admin address, one separate
 * message each so no address sees the others. Never use this for codes, reset links or other secrets.
 * Returns true if at least one admin received it.
 */
export async function notifyAdmins({ subject, html, replyTo }: { subject: string; html: string; replyTo?: string }) {
  const results = await Promise.all(adminRecipients().map((to) => sendEmail({ to, subject, html, replyTo })));
  return results.some(Boolean);
}
