import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddName from "./AddName";
import AddColumns from "./AddColumns";
import { useState } from 'react';
import { useEffect } from 'react';
import { createSpace } from '../../../apiCalls/spacesApis';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import GroupsIcon from '@mui/icons-material/Groups';
import { toast } from 'react-toastify';
const steps = [{
  title:"Add Information", icon:<InfoIcon />},
 {title:"Add Columns", icon:<ViewColumnIcon />},
  {title:'Add members', icon:<GroupsIcon /> }];

export default function CreateSpace() {
  const [activeStep, setActiveStep] = useState(0);
  const [component, setComponent] = useState(<AddName />);
  const [name, setName] = useState('')
  const navigate = useNavigate()
  const [description, setDescription] = useState('')
  const [columns, setColumns] = useState([
    "priority","assignee","status","name","due date"
  ])
  console.log(columns)
  // priority,assignee,status,dueDate,timer,name,
  useEffect(()=>{
    switch (activeStep) {
      case 0:
        setComponent(<AddName setName={setName} setDescription={setDescription}  />)
        break;
      case 1:
        setComponent(<AddColumns setColumns={setColumns} />)
        break;
        case 2:
          setComponent(<h1>Helo</h1>)
          break;
      default:
        break;
    }
  },[activeStep])

  const handleNext = () => {
    if(name.length < 5 && description.length < 20 && activeStep === 0){
      toast.error('Enter Name And Description',{autoClose:1000})
    }
    else{
      setActiveStep((prev)=>prev +1);
    }
    

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

return (
    <Box sx={{ width: '100%' }}>
      <Stepper className='w-[60%] mx-auto mt-5 mb-[2em]' activeStep={activeStep} >
        {steps.map((step, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={step} {...stepProps}>
              <StepLabel  icon={step.icon} {...labelProps}><span className='p-1 bg-[white]'>{step.title}</span></StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {component}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={
              activeStep === steps.length - 1  ?()=> createSpace(name, description, columns, navigate) 
              :
              handleNext
              }>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}