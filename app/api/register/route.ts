import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";



export async function POST(request: NextResponse) {

    const { username, email, password, role } = await request.json();

    if ([username, email, password, role].some(field => field?.trim() === "")) {
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
        }
        )
    }

    await connectToDatabase();


    const user = await User.create({
        username,
        email,
        password,
        role
    })

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
}