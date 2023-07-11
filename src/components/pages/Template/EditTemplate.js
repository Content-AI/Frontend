import React, { useState, useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module';

const EditTemplate = () => {
    const [editorState, setEditorState] = useState('');
    const editorRef = useRef(null);
  
    useEffect(() => {
      Quill.register('modules/imageResize', ImageResize);
  
      editorRef.current = new Quill('#editor', {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline'],
            ['link'],
            ['image'],
          ],
          imageResize: {
            module: 'imageResize',
            handleStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white',
              width: '16px',
              height: '16px',
            },
          },
        },
      });
  
      editorRef.current.on('text-change', () => {
        setEditorState(editorRef.current.root.innerHTML);
      });
  
      return () => {
        editorRef.current.off('text-change');
        editorRef.current = null;
      };
    }, []);
  
    const handleImageUpload = () => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();
  
      input.onchange = () => {
        const file = input.files[0];
  
        if (file && file.type.includes('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const range = editorRef.current.getSelection();
            const index = range ? range.index : 0;
  
            editorRef.current.insertEmbed(index, 'image', e.target.result);
            editorRef.current.setSelection(index + 1);
          };
          reader.readAsDataURL(file);
        }
      };
    };
  
    return (
      <div>
        <div id="editor" />
        <button onClick={handleImageUpload}>Insert Image</button>
        <p>Editor State: {editorState}</p>
      </div>
    );
  };
  
  export default EditTemplate;
  