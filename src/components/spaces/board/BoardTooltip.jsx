import moment from 'moment'
import React from 'react'

const BoardTooltip = ({data}) => {
    const startDate = moment(data.start_date).format('DD MM YYYY')
    const endDate = moment(data.end_date).format('DD MM YYYY')
  return (
    <div className='flex flex-col p-[1em] text-[white] bg-[black]'>
        <h1>Name: {data.text} </h1>
        <h1>Start Date: {startDate}</h1>
        <h1>End Date: {endDate}</h1>
        <h1>Status: {data.status}</h1>
        <h1>Progress: {data.progress}</h1>
    </div>
  )
}

export default BoardTooltip