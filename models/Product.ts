import { Schema, ObjectId, Model, model, models } from "mongoose";

export interface IImageVarient {
    id?:ObjectId;
    type: "SQUARE" | "WIDE" | "POTRAIT";
    price: number;
    licence: "personal" | "commercial"
}

export interface IProduct{
    _id?:ObjectId;
    name:string;
    description:string;
    imageUrl:string;
    variants:IImageVarient
}


const imageVariantSchema: Schema = new Schema<IImageVarient>(
    {
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
    }
    , { timestamps: true }
)


const productSchema:Schema = new Schema<IProduct>({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    variants:[imageVariantSchema]
},{timestamps:true})


export const Product:Model<IProduct> = models?.Product || model("Product",productSchema)