import { NextRequest, NextResponse } from "next/server"
import {prisma} from "@/utils/db"
import { writeFile } from "fs/promises"
import { join } from "path"
import { ProductType } from "@/types/types"



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
export const POST = async (req: NextRequest) => {
    try {
   
        const body=await req.formData()
        const title=body.get('title') as unknown as string
        const desc=body.get('desc') as unknown as string
        const price=body.get('price') as unknown as number
        const options=body.get('options') as unknown as string
        const catSlug=body.get('catSlug') as unknown as string
        const file:File | null=body.get('file') as unknown as File

        if(!file)
        return NextResponse.json({msg:"Image Not Uploaded!"})
        
        

        const bytes=await file.arrayBuffer()
        const buffer=Buffer.from(bytes)

       
        const path="public/prdImgs/"+new Date().getTime().toString()+"-"+file.name
        await writeFile(path,buffer)
        const prd1={
            title,
            desc,
            img:path.substring(path.indexOf("/")),
            price,
            options:JSON.parse(options),
            catSlug
        }
        
        const product = await prisma.product.create({
            data:prd1,
        });
        
        
      return NextResponse.json(product)
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  };