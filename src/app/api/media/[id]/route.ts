import connectDB from "@/lib/mongodb";
import Media from "@/models/Media";
import mongoose from "mongoose";

export const runtime = "nodejs";

export async function GET(_req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!mongoose.isValidObjectId(id)) return new Response("Not found", { status: 404 });

  await connectDB();
  const media: any = await Media.findById(id).lean();
  if (!media) return new Response("Not found", { status: 404 });

  const bytes = media.data?.buffer ? Buffer.from(media.data.buffer) : Buffer.from(media.data);
  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": media.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
