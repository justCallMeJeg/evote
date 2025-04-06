import Link from 'next/link'
import React from 'react'

const HomeCard = ({ title, description, href } : { title: string, description: string, href: string }) => {
  return (
    <Link href={href}>
        <div className="card-body shadow-2xl border-2 border-gray-800
            hover:scale-101 transition-all duration-300 ease-in-out hover:border-gray-700">
            <h2 className="card-title">{title}</h2>
            <p>{description}</p>
        </div>
    </Link>
  )
}

export default HomeCard
