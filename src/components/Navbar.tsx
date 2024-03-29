"use client"
import Link from 'next/link'
import React from 'react'
import Menu from './Menu'
import Image from 'next/image'
import CartIcon from './CartIcon'
import UserLinks from './UserLinks'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  


  return (
    <div className="h-12 text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-40">
      {/* LEFT LINK */}
      <div className='hidden md:flex gap-4 flex-1'>
          <Link href={"/"}>HOME</Link>
          <Link href={"/menu"}>MENU</Link>
          <Link href={"/"}>CONTACT</Link>
      </div>

      {/* LOGO */}
        <div className='text-xl md:font-bold flex-1 md:text-center'>
          <Link href={"/"}>Massimo</Link>
        </div>

        {/* MOB MENU */}
        <div className='md:hidden'>
        <Menu/>
        </div>

          <div className='hidden md:flex gap-4 flex-1 justify-end items-center'>

        <div className='flex items-center gap-2 cursor-pointer bg-orange-300 px-1 rounded-md md:absolute top-3 right-2 lg:static'>
         <Image src={"/phone.png"} alt='' width={20} height={20} />
          <span>123 456 78</span>
        </div>
        {/* <Link href={user?"/orders":"/login"}>{user?"Orders":"Login"}</Link> */}
        <UserLinks />
        {
          session?.user.isAdmin?
          <Link href={"/add"} className='flex gap-2 items-center'>
              <div className='bg-red-400 p-2 rounded-full relative'>
                      <Image src={"/edit.png"} width={20} height={20} alt=""/>
              </div>
              <span>ITEM-ADD</span>        
          </Link>: <CartIcon />
        }
       

        </div>

    </div>
  )
}

export default Navbar