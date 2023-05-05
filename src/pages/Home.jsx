import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { getAllSpaces } from '../apiCalls/spacesApis'
import Sidebar from '../components/navigations/Sidebar'
import { useState } from 'react'

const Home = () => {
  const {isFetching} = useSelector(state=>state.user)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const dispatch = useDispatch()
  useEffect(()=>{
      getAllSpaces(dispatch)
  }, [])

  return (
    <>
    {
      isFetching ?  "Loading" :
      <div className='flex h-[100%] w-[100%]'>
      <nav className="h-[100%]">
          <Sidebar isSidebarCollapsed={isSidebarCollapsed} setIsSidebarCollapsed={setIsSidebarCollapsed}  />
          </nav>
          <div
          className={`w-[100%] h-[100%] overflow-scroll ${isSidebarCollapsed ? "ml-[50px]" : "ml-[250px]"} `}>
          <Outlet />
          </div>
          </div>
        }
        </>
  )
}

export default Home