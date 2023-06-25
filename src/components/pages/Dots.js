import React from 'react'

const Dots = ({steps}) => {
  return (
    <div className="flex justify-center items-center">
      {steps=="first"
      ?
        <>
          <button className="ml-2 mr-2 rounded-md w-8 h-1 bg-blue-500 border-none cursor-pointer"></button>
          <button className="ml-2 mr-2 rounded-md w-8 h-1 bg-[#CFD0D5] border-none cursor-pointer"></button>
          <button className="ml-2 mr-2 rounded-md w-8 h-1 bg-[#CFD0D5] border-none cursor-pointer"></button>
        </>
      :
        null
      }
      {steps=="second"
      ?
        <>
          <button className="ml-2 mr-2 rounded-md w-8 h-1 bg-[#CFD0D5] border-none cursor-pointer"></button>
          <button className="ml-2 mr-2 rounded-md w-8 h-1 bg-blue-500 border-none cursor-pointer"></button>
          <button className="ml-2 mr-2 rounded-md w-8 h-1 bg-[#CFD0D5] border-none cursor-pointer"></button>
        </>
      :
        null
      }
      {steps=="third"
      ?
        <>
          <button className="ml-2 mr-2 rounded-md w-8 h-1 bg-[#CFD0D5] border-none cursor-pointer"></button>
          <button className="ml-2 mr-2 rounded-md w-8 h-1 bg-[#CFD0D5] border-none cursor-pointer"></button>
          <button className="ml-2 mr-2 rounded-md w-8 h-1 bg-blue-500 border-none cursor-pointer"></button>
        </>
      :
        null
      }

    </div>
  )
}

export default Dots