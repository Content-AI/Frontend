import React, { useEffect, useState,useRef } from 'react'
import { useParams } from 'react-router-dom';

const EditTemplate = () => {
    const { template_id } = useParams();


  return (
    <div>EditTemplate</div>
  )
}

export default EditTemplate