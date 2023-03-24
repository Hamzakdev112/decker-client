import React from 'react'
import { useSelector } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit';
import Member from './Member';
import Head from '../../Head';


const Settings = () => {
    const {singleSpace} = useSelector((state)=>state.spaces)
  return (
    <div className='w-[90%]'>
    <Head title={`${singleSpace?.name} - Settings`} description={singleSpace?.description} />
        <h1 className='text-[1.7em] mb-[2em]'>Settings</h1>

        <div className='w-[200px]  border-[5px] mb-[2em] border-[gray] aspect-square'>
        <img src="https://img.freepik.com/premium-vector/space-logo_629862-83.jpg" className=' w-[100%] h-[100%]' alt="" />
        </div>


        <div className='p-[2em] flex flex-col gap-3 w-[100%] border-[1px] border-[#c2c2c2]'>
            <h3 className='text-[1.2em]'>Space Name</h3>
            <span className='text-[#616060] text-[1em] flex gap-2'>
                {singleSpace?.name}
            <button><EditIcon sx={{fontSize:'1.2em'}}/></button>
            </span>
        </div>

        <div className='p-[2em] flex flex-col gap-3 w-[100%] border-[1px] border-[#c2c2c2]'>
            <h3 className='text-[1.2em]'>Space Description</h3>
            <span className='text-[#616060] text-[1em] flex-wrap break-all flex gap-2'>
                {singleSpace?.description}
            <button><EditIcon sx={{fontSize:'1.2em'}}/></button>
            </span>
        </div>

        <div className='p-[2em] flex flex-col gap-[2.5em] w-[100%] border-[1px] border-[#c2c2c2]'>
            <h3 className='text-[1.2em] '>Members</h3>
            <div className=' w-[80%] mx-auto flex gap-[1.3em] flex-wrap'>
                {
                    singleSpace?.members.map((member)=>(
                        <Member key={member._id} {...member} />
                        ))
                }
            </div>
        </div>


    </div>
  )
}

export default Settings