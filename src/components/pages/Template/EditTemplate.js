import React, { useEffect, useState } from "react";
// import  QuillWrapper from './quillcomponent'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import Quill from 'quill';

Quill.register('modules/imageResize', ImageResize);
export default function EditTemplate() {
  const [value, setValue] = useState('');

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'blockquote'],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize'],
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'link',
    'image',
    'blockquote',
    'align',
    'color',
    'background',
  ];



  return (
    <div className="fixed z-50 top-0 left-0 right-0 h-screen bg-white">
    <div className="relative z-10">
    {/* ============================== */}
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      modules={modules}
      formats={formats}
      placeholder="Write something amazing..."
    />
   
    {/* ============================== */}
    </div>
  </div>
  );
}
