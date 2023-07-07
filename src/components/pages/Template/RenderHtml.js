import React, { useEffect, useState } from 'react';

const RenderHtml = ({ htmldata }) => {
  const formattedContent = htmldata
    .split('\n')
    .map((line, index) => (index === 0 ? line : `<br>${line}`))
    .join('');

  return (
    <>
        <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
        {/* {formattedContent} */}
    </>
    )};

export default RenderHtml;
