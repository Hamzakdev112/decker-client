import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddName from "./AddName";
import AddColumns from "./AddColumns";
import { useState } from 'react';
import { useEffect } from 'react';
import { createSpace } from '../../../apiCalls/spacesApis';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import GroupsIcon from '@mui/icons-material/Groups';
import { toast } from 'react-toastify';
import AddMembers from './AddMembers';
import AddCustomizations from './AddCustomizations';
import Steps from './Steps';
import { useDispatch, useSelector } from 'react-redux';

const steps = [
  { title: "Add Information", icon: <InfoIcon /> },
  { title: 'Customizations', icon: <DashboardCustomizeIcon /> },
  { title: "Add Columns", icon: <ViewColumnIcon /> },
  { title: 'Add members', icon: <GroupsIcon /> },
];

export default function CreateSpace() {
  const [activeStep, setActiveStep] = useState(0);
  const [component, setComponent] = useState(<AddName />);
  const [name, setName] = useState('')
  const navigate = useNavigate()
  const [description, setDescription] = useState('')
  const [createdSpace, setCreatedSpace] = useState(null)
  const {color,selectedColumns} = useSelector((state)=>state.createSpace)
  const handleCreateSpace = async () => {
    const columnNames = selectedColumns.map((column) => column.name);
    const data = await createSpace(name, description, columnNames, navigate)
    setCreatedSpace(data.space)
    handleNext()
  }


  useEffect(() => {
    switch (activeStep) {
      case 0:
        setComponent(<AddName name={name} description={description} setName={setName} setDescription={setDescription} />)
        break;
      case 1:
        setComponent(<AddCustomizations  />)
        break;
      case 2:
        setComponent(<AddColumns />)
        break;
      case 3:
        setComponent(<AddMembers setCreatedSpace={setCreatedSpace} createdSpace={createdSpace} />)
        break;
      default:
        break;
    }
  }, [activeStep])

  const handleNext = () => {
    name.length < 5 ?
      toast.error('Name must be atleast 5 characters', { autoClose: 1000 })
      :
      description.length < 20 ?
        toast.error('Description must be atleast 20 characters', { autoClose: 1000 })
        :
        setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className='w-[100%]'>
      <div className='items-center flex gap-[10px] h-[70px] ml-[100px]' activeStep={activeStep} >
        {steps.map((step, index) => {
          return (
            <Steps key={index} index={index} step={step} activeStep={activeStep} />
          );
        })}
      </div>
      <div>
        <div className=''>
          {component}
        </div>
        <div className='w-[60%] mt-[30px] mx-auto flex justify-between'>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <button
            className='!bg-[red] rounded-[7px] !text-[white] hover:!bg-[#bb0000] w-[80px] h-[30px]'
            onClick={
                activeStep === steps.length - 2 ? handleCreateSpace
              : activeStep === steps.length - 1 ? () => navigate(`/space/${createdSpace._id}/list`)
              : handleNext
            }
            >
            {
              activeStep === steps.length - 2 ? 'Create'
                : activeStep === steps.length - 1 ? 'Skip'
                  : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}