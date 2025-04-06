import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <header className="navbar bg-base-100 shadow-sm">
        <Link href="./" className="btn btn-ghost text-xl">evote</Link>
    </header>
  )
}

export default Navbar