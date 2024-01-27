import { NextResponse } from "next/server"
import {prisma} from "@/utils/db"


export const GET=async()=>{
    try{

        const categories=await prisma.category.findMany()
        return NextResponse.json(categories)
    }
    catch(err){
        console.log(err);
        return NextResponse.json({msg:"Server Error"})
    }

}