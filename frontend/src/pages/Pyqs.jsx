import React from 'react'
import Card from '../components/Card'
import Button from "../components/Button"
import { useNavigate } from 'react-router-dom'


const Pyqs = () => {
  const nav = useNavigate();
  return (
    <div>
      <div className="flex justify-end px-5 mt-5">
        <Button onClick={()=>nav("/upload-pyq")} className="py-1 px-2 w-[200px]">Want to upload pyqs? </Button>
      </div>

      <div className="flex flex-wrap h-screen ml-5 mr-5 mt-2 bg-jmi-300 p-4 border-2 rounded-2xl border-jmi-500 gap-x-5">
        <Card 
          subject="OOPS" 
          content="This is a diploma computer engineering OOPS last year paper" 
          department="DCS" 
          year="2024" 
        />
        <Card 
          subject="Microprocessor" 
          content="Microprocessor exam paper" 
          department="DCS" 
          year="2023" 
        />
        <Card 
          subject="Microprocessor" 
          content="Another Microprocessor exam paper" 
          department="DCS" 
          year="2023" 
        />
      </div>
    </div>
  )
}

export default Pyqs
