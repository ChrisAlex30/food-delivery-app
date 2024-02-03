"use client";
import { useCartStore } from '@/utils/store';
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'

const CartIcon = () => {
  const {totalItems}= useCartStore()

  useEffect(()=>{
    useCartStore.persist.rehydrate()
  },[])
  return (
    <Link href={"/cart"} className='flex gap-8 items-center'>
        <div className='relative w-8 h-8 md:w-5 md:h-5'>
                <Image src={"/cart.png"} alt='' fill/>
        </div>
        <span>cart ({totalItems})</span>
        
    </Link>
  )
}

export default CartIcon