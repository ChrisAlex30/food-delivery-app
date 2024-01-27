"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const UserLinks = () => {
    const {status}=useSession()
   
  return (
    <div>
        {/* <Link href={status==="authenticated"?"/orders":"/login"}>{status==="authenticated"?"Orders":"Login"}</Link> */}
        {
            status==="authenticated"?
            <div>
                <Link href={"/orders"}>Orders</Link>
                <span className="ml-2 cursor-pointer" onClick={()=>signOut()} >LogOut</span>
            </div>
            :
            <Link href={"/login"}>Login</Link>
        }
    </div>
  )
}

export default UserLinks