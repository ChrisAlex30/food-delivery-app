import Link from 'next/link'
import React from 'react'
import Menu from './Menu'
import Image from 'next/image'
import CartIcon from './CartIcon'

const Navbar = () => {
  const user = true;
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
        <Link href={user?"/orders":"/login"}>{user?"Orders":"Login"}</Link>
        <CartIcon />

        </div>

    </div>
  )
}

export default Navbar