import { NextRequest, NextResponse } from "next/server"
import {prisma} from "@/utils/db"
import { getAuthSession } from "@/utils/auth"


export const GET=async(req:NextRequest,{params}:{params:{id:string}})=>{    
        try{
            const {id}=params

            const product= await prisma.product.findUnique({
                where:{
                    id
                }
            })
            return NextResponse.json(product)
        }
        catch(err){
            console.log(err);
            return NextResponse.json({msg:"Server Error"},{status:500})
        }
}

export const DELETE=async(req:NextRequest,{params}:{params:{id:string}})=>{    
    const session=await getAuthSession()
    //console.log(session);
    if (session?.user.isAdmin) {
        try{
            const {id}=params
            await prisma.product.delete({
                where: {
                  id
                },
              });
        
             
            return NextResponse.json("Product has been deleted!")
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