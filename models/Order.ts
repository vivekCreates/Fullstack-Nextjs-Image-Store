import { Schema, ObjectId, Model, model, models } from "mongoose"
import { IImageVarient } from "./Product";

interface IOrder {
    _id?:ObjectId;
    userId: ObjectId;
    productId: ObjectId;
    variants: IImageVarient;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    amount: number;
    status: "pending" | "completed" | "failed"
    createdAt?:Date;
    updatedAt?:Date;
}


const orderSchema: Schema = new Schema<IOrder>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        variants: {
            type: {
                type: String,
                required: true,
                enum: ["SQUARE", "WIDE", "POTRAIT"]
            },
            price: {
                type: Number,
                required: true,
                require: true,
                min: 0
            },
            licence: {
                type: String,
                required: true,
                enum: ["personal", "commercial"]

            }
        },
        razorpayOrderId:{
            type:String,
            required:true
        },
        razorpayPaymentId:{
            type:String,
            required:true
        },
        amount:{
            type:Number,
            required:true
        },
        status:{
            type:String,
            enum:["pending","completed","failed"]
        }

    }
    , { timestamps: true }
)


export const Order:Model<IOrder> = models?.Order || model("Order",orderSchema); 