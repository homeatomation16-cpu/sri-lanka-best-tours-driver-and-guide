import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

/** * Next.js වල development mode එකේදී සර්වර් එක නිතර restart වෙනවා. 
 * ඒ හැම වෙලාවකම අලුත් connection එකක් හැදෙන එක නවත්වන්න 'global' object එක පාවිච්චි කරනවා.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Connection එකක් නැතිව commands buffer කිරීම නවත්වයි
      serverSelectionTimeoutMS: 10000, // තත්පර 10ක් ඇතුළත connect වුණේ නැත්නම් error එකක් දෙයි
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ MongoDB Connected Successfully");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Error එකක් ආවොත් මීළඟ වතාවේ නැවත උත්සාහ කිරීමට promise එක reset කරයි
    throw e;
  }

  return cached.conn;
}

export default connectDB;