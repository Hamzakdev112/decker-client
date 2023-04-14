import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/roadmap/Navbar'

const Roadmap = () => {
  return (
    <div>
      <Navbar />

        <Outlet />
    </div>
  )
}

export default Roadmap