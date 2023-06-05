import { Dialog, DialogContent } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const SingleTaskDialog = ({open}) => {
  const {singeTaskDialogOpen } = useSelector((state) => state.tasks);
  console.log(singeTaskDialogOpen)
  const dispatch = useDispatch()
  return (
    <Dialog
    open={singeTaskDialogOpen}
    maxWidth="md"
  >
    <DialogContent
      className="overflow-x-hidden"
    >
      <div className="w-[100vw] h-[100vh]"></div>
    </DialogContent>
  </Dialog>

  )
}

export default SingleTaskDialog