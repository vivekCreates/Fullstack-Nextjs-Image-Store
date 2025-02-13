import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";


export async function GET(props: { params: Promise<{ id: string }> }) {
    try {

        const { id } = await props.params;
        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Product id is required"
            },
                {
                    status: 400
                })
        }

        await connectToDatabase();

        const product = await Product.findOne({ _id: id })

        if (!product) {
            return NextResponse.json({
                success: false,
                message: " No Product found with this id"
            },
                {
                    status: 400
                })
        }

        return NextResponse.json({
            success: true,
            message: "Product fetch successfully!"
        }, { status: 200 })

    } catch (error: any) {
        console.error("Error:", error.message)
        return NextResponse.json({
            success: false,
            message: "Error: While fetching a product"
        },
            {
                status: 500
            })
    }


}