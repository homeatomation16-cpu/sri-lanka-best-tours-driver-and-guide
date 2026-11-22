// Admin: website user accounts (customers who signed up). Admin login required for every method.
//   GET                         -> list (no password hashes or tokens)
//   PATCH { id, action }        -> action: "verify" (mark e-mail confirmed) | "signout" (end all sessions)
//   DELETE ?id=...              -> delete the account (their bookings stay)
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Customer from "@/models/Customer";
import Booking from "@/models/Booking";
import { requireAdmin } from "@/lib/adminAuth";

const validId = (id: unknown): id is string => typeof id === "string" && /^[a-f0-9]{24}$/.test(id);

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  await connectDB();
  const [users, counts] = await Promise.all([
    Customer.find({}).select("+googleId").sort({ createdAt: -1 }).lean(),
    Booking.aggregate([{ $group: { _id: { $toLower: "$email" }, n: { $sum: 1 } } }]),
  ]);
  const bookings = new Map(counts.map((c: { _id: string; n: number }) => [c._id, c.n]));
  return NextResponse.json({
    users: users.map((u: any) => ({
      id: String(u._id),
      name: u.name,
      email: u.email,
      emailVerified: Boolean(u.emailVerified),
      google: Boolean(u.googleId),
      createdAt: u.createdAt,
      lastLoginAt: u.lastLoginAt ?? null,
      bookings: bookings.get(String(u.email).toLowerCase()) ?? 0,
    })),
  });
}

export async function PATCH(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id, action } = await req.json().catch(() => ({}));
  if (!validId(id) || !["verify", "signout"].includes(action)) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  await connectDB();
  const update = action === "verify" ? { emailVerified: true } : { $inc: { tokenVersion: 1 } };
  const result = await Customer.updateOne({ _id: id }, update);
  return result.matchedCount ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const id = new URL(req.url).searchParams.get("id");
  if (!validId(id)) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  await connectDB();
  const result = await Customer.deleteOne({ _id: id });
  return result.deletedCount ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Not found" }, { status: 404 });
}
