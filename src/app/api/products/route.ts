import { NextRequest, NextResponse } from "next/server"
import {prisma} from "@/utils/db"


export const GET=async(req:NextRequest)=>{
    try{
        const {searchParams} =new URL(req.url)
        const cat=searchParams.get("cat")
        const products=await prisma.product.findMany({
            where:{
                ...(cat? {catSlug:cat}:{isFeatured:true})
            }
        })
        return NextResponse.json(products)
    }
    catch(err){
        console.log(err);
        return NextResponse.json({msg:"Server Error"})
    }

}