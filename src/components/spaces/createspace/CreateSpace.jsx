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
const steps = ["Add Information", "Add Columns", 'Add members'];

export default function CreateSpace() {
  const [activeStep, setActiveStep] = useState(0);
  const [component, setComponent] = useState(<AddName />);
  const [name, setName] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const [description, setDescription] = useState('')
  const [columns, setColumns] = useState({
    priority:true,
    assignee:true,
    status:true,
    dueDate:true,
    timer:false,
    name:true,
  })
  console.log(columns)
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
      default:
        break;
    }
  },[activeStep])

  const handleNext = () => {
    if(name.length < 5 && description.length < 20 && activeStep === 0){
      setError('please enter name and description')
    }
    else{
      setActiveStep((prev)=>prev +1);
      setError(null)
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
      <Stepper activeStep={activeStep} sx={{borderBottom:"1px solid #e0e0e0",height:"70px"}} >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
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
          {
            error && 
            <div className='w-[90%] mx-auto'><span className='text-[red]'>{error}</span></div>
          }
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