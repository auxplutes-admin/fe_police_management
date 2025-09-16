import { Hero } from '@/components/Home/Hero'
import { Navbar } from '@/components/Home/Navbar'
import React from 'react'

const Home:React.FC = () => {
  return (
    <>
      <div>
      <Navbar/>
      <Hero/>
      </div>
    </>

  )
}

export default Home