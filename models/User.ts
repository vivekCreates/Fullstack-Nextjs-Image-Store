import {Schema,Model,model,models} from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
    _id:Schema.Types.ObjectId;
    username:string;
    email:string;
    password:string;
    role:"user"|"admin";
    createdAt:Date;
    updatedAt:Date;
}

const userSchema:Schema = new Schema<IUser>(
    {
        username:{
            type:String,
            required:true,
            trim:true,
            lowercase:true
        },
        email:{
            type:String,
            required:true,
            trim:true,
            lowercase:true
        },
        password:{
            type:String,
            required:true,
        },
        role:{
            type:String,
            enum:["user","admin"],
            default:"user"
        }
    },
    {
    timestamps:true
    }
) 

userSchema.pre("save",async function(next){
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password as string,10);
    }
    next();
})

export const User:Model<IUser> = models?.User || model<IUser>("User",userSchema)