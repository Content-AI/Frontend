import React, { useEffect, useState } from 'react'

const RenderHtml = ({htmldata}) => {
    // console.log(htmldata)
      const formattedContent = htmldata.replace(/\n/g, '<br>');

  return (
      <>
          <div  dangerouslySetInnerHTML={{ __html: formattedContent }} />
      </>
  )
}

export default RenderHtml