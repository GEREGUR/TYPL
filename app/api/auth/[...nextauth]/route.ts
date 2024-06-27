import User from "@/app/models/User";
import { connectMongoDB } from "@/lib/mongodb";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      authorize: async (credentials) => {
        const { login, password } = credentials as {
          login: string;
          password: string;
        };

        try {
          await connectMongoDB();
          const user = await User.findOne({ login });
          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            return null;
          }

          return {
            id: user._id.toString(),
            name: user.name,
            login: user.login,
            secondName: user.secondName,
            surname: user.surname,
            studyGroup: user.studyGroup,
            role: user.role,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: "/auth/sign-in",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
