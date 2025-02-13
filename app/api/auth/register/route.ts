import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request: NextResponse) {

    try {
        const { username, email, password, role } = await request.json();

        if ([username, email, password].some(field => field?.trim() === "")) {
            return NextResponse.json({
                success: false,
                message: "All fields are required"
            },
                {
                    status: 400
                }
            )
        }

        if (password.length < 8) {
            return NextResponse.json({
                success: false,
                message: "Password must be atleast 8 characters"
            }, {
                status: 400
            })
        }

        await connectToDatabase();

        const existedUser = await User.findOne({ email });

        if (existedUser) {
            return NextResponse.json({
                success: false,
                message: "User already exists"
            }, { status: 400 })
        }

        const user = role ?
            await User.create({
                username,
                email,
                password,
                role
            }) : await User.create({
                username,
                email,
                password
            });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not registered"
            }, {
                status: 400
            }
            )
        }

        return NextResponse.json({
            success: true,
            user,
            message: "user registred successfully"
        },
            {
                status: 201
            }
        )
    } catch (error: any) {
        console.error("Error:",error.message)
        return NextResponse.json({
            success: false,
            message: error.message
        }, {
            status: 500
        })
    }
}