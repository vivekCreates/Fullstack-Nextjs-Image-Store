import { authOptions } from "@/lib/authOptions";
import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";



export async function GET() {
    try {
        await connectToDatabase()

        const products = await Product.find({})

        if (!products || products.length < 1) {
            return NextResponse.json({
                success: false,
                message: "No Products found"
            },
                { status: 400 }
            )
        }

        return NextResponse.json({
            success: true,
            products,
            message: "Products fetched successfully!"
        },
            { status: 200 }
        )

    } catch (error:any) {
        console.error("Error:",error.message)
        return NextResponse.json({
            success: false,
            message: "Error: While fetching all products"
        },
            {
                status: 500
            })
    }
}



export async function POST(request: NextRequest) {

    try {

        const session = await getServerSession(authOptions)
        if (!session || session.user?.role !== "admin") {
            return NextResponse.json({
                success: false,
                message: "Unauthorized User"
            },
                { status: 401 })
        }

        const { name, description, imageUrl, variants } = await request.json();

        if (!name || !description || imageUrl || variants.length == 0) {
            return NextResponse.json({
                success: false,
                message: "All fields are required"
            },
                { status: 400 })
        }

        await connectToDatabase();

        const product = await Product.create({
            name,
            description,
            imageUrl,
            variants
        })

        if (!product) {
            return NextResponse.json({
                success: false,
                message: "Product not created"
            },
                { status: 400 })
        }

        return NextResponse.json({
            success: true,
            message: "Product created successfully!"
        },
            { status: 200 })
    } catch (error:any) {
        console.error("Error:",error.message)
        return NextResponse.json({
            success: false,
            message: "Error While creating the Product"
        },
            { status: 500 })
    }

}