import React from 'react'
import Card from '../components/Card'

const Pyqs = () => {
  return (
    <div>
        <div className='flex flex-wrap gap-x-5'>
           <Card subject="Oops" content="this is a diploma computer engineering oops last year paper" department="DCS" year="2024" />
           <Card subject="microprocessor" department="DCS" year="2023" ></Card>
           <Card subject="microprocessor" department="DCS" year="2023" ></Card>
        </div>
    </div>
  )
}

export default Pyqs