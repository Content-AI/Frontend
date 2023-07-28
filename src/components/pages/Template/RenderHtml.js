import React, { useEffect, useState } from 'react';

const RenderHtml = ({ htmldata }) => {

  // console.log(htmldata.blocks[0].data.text)
  const formattedContent = htmldata?.blocks[0].data.text
    .split('\n')
    .map((line, index) => (index === 0 ? line : `<br>${line}`))
    .join('');

  return (
        <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
    )};

export default RenderHtml;
