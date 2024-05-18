import Link from 'next/link'
import React from 'react'

const HeaderLogo = () => {
  return (
    <Link href={'/'}>
       <div className='items-center hidden lg:flex'>
          <img src="/finuva.png" alt="logo" height={60} width={60}/>
          <p className='font-semibold text-white text-2xl ml-2.5'>
            Finuva
          </p>
       </div>
    </Link>
  )
}

export default HeaderLogo
