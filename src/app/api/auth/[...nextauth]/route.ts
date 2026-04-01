import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// 1. authOptions වෙනම export කරන්න. 
// එවිට getServerSession(authOptions) ලෙස Admin page එකේදී පාවිච්චි කළ හැක.
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // .env.local එකේ ඇති values සමඟ සසඳා බැලීම
        if (
          credentials?.username === process.env.ADMIN_USERNAME &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "1", name: "Admin", email: "admin@srilankabesttour.com" };
        }
        return null;
      }
    })
  ],
  // 2. Secret එක මෙතැන අනිවාර්යයෙන්ම සඳහන් කරන්න (Decryption error එක නැති කිරීමට)
  secret: process.env.NEXTAUTH_SECRET,
  
  session: {
    strategy: "jwt", // JSON Web Token ක්‍රමය භාවිතා කිරීම
  },
  
  pages: {
    // i18n පාවිච්චි කරන නිසා සාමාන්‍යයෙන් middleware මගින් locale එක handle වේ. 
    // නමුත් සෘජුවම /login ලෙස දීම ප්‍රමාණවත්ය.
    signIn: "/login", 
  },

  callbacks: {
    // අවශ්‍ය නම් මෙතැනින් session එකට තවත් දත්ත එකතු කළ හැක
    async session({ session, token }) {
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };