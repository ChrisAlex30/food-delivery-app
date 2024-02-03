import { NextRequest, NextResponse } from "next/server"
import {prisma} from "@/utils/db"
import { getAuthSession } from "@/utils/auth"


export const GET=async(req:NextRequest)=>{
    const session=await getAuthSession()
    console.log(session);
    if(session){
        try{
            if(session.user.isAdmin){
                const orders=await prisma.order.findMany()
                return NextResponse.json(orders)
            }
            const orders=await prisma.order.findMany({
                where:{
                    userEmail:session.user.email!
                }
            })
            return NextResponse.json(orders)
        }
        catch(err){
            console.log(err);
            return NextResponse.json({msg:"Server Error"},{status:500})
        }

    }
    else{
        return NextResponse.json({msg:"Not Authorized"},{status:401})
    }

}