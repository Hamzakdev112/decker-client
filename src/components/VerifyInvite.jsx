import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { verifyInvite } from '../apiCalls/spacesApis'

const VerifyInvite = () => {
  const location = useLocation()
  const spaceId = location.pathname.split('/')[3]
  const token = location.pathname.split('/')[4]
  const navigate = useNavigate()

  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(false)
  const [success,setSuccess] = useState(false)


  useEffect(()=>{
    const handleVerify = async()=>{
      setLoading(true)
      try{
        const {data} =  await verifyInvite(spaceId,token)
        setLoading(false)
        setError(null)
        setSuccess(true)
        navigate(`/space/${spaceId}/list`)
      }
      catch(err){
        setLoading(false)
        setError(err.response.data.message)
      }
    }
    handleVerify()
  },[])


  return (
    <div>
        {
          loading ?<span className='text-[blue] text-[2em]'>VERIFYING</span> 
          :
        error ? <span className='text-[red] text-[2em]'>{error}</span> 
          :
          success && <span className='text-[green] text-[2em]'>Verifed! Redirecting...</span> 
        }
    </div>
  )
}

export default VerifyInvite