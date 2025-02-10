import { connectToDatabase } from './db';
import { User } from '@/models/User';
import { NextAuthOptions, User as NextAuthUser } from "next-auth";
import  CredentialsProvider  from 'next-auth/providers/credentials';
import bcrypt  from 'bcryptjs';

interface CustomUser extends NextAuthUser {
    id: string;
    username: string;
    email:string;
    role: string;
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
            async authorize(credentials): Promise<CustomUser| null> {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Invalid credentials");
                    }

                    await connectToDatabase();

                    const user = await User.findOne({ email: credentials.email });

                    if (!user) {
                        throw new Error("No user found with these credentials");
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                    if (!isPasswordCorrect) {
                        throw new Error("Email or password is incorrect");
                    }
                    return {
                        id: user._id.toString(),
                        username: user.username,
                        email: user.email,
                        role: user.role,
                    };
                   
                } catch (error: any) {
                    console.error("Auth Error:", error.message);
                    throw new Error(error.message || "Authentication error");
                }
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                const customUser = user as CustomUser; 
                token.id = customUser.id;
                token.role = customUser.role;
            }
            return token;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET!,
};
