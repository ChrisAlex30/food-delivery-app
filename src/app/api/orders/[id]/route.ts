import { NextRequest, NextResponse } from "next/server"
import {prisma} from "@/utils/db"
import { getAuthSession } from "@/utils/auth"


export const PUT=async(req:NextRequest,{params}:{params:{id:string}})=>{    
        try{
            const {id}=params
            const body=await req.json()

            await prisma.order.update({
                where:{
                    id
                },
                data:{status:body}
            })
            return NextResponse.json({msg:"Order Updated!!!"})
        }
        catch(err){
            console.log(err);
            return NextResponse.json({msg:"Server Error"},{status:500})
        }


}