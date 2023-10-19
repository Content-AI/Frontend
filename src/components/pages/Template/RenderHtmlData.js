import React, { useEffect, useState } from 'react';


const RenderHtmlData = ({ htmldata }) => {

  const formattedContent = htmldata
    .split('\n\n')
    .map((line, index) => (index === 0 ? line : `<br>${line}`))
    .join('');

  return (
        <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
    )};

export default RenderHtmlData;
