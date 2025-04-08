import Link from 'next/link'
import React from 'react'
import { Logomark } from '../icons'

const Navbar = () => {
  return (
    // Fit content hieght
    <header className="navbar bg-base-300 shadow-2xl sticky top-0 z-50">
        <Link href="./" className="btn btn-ghost text-xl"><Logomark/></Link>
    </header>
  )
}

export default Navbar