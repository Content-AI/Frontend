import ReactQuill, { Quill } from "react-quill";
import BlotFormatter from "quill-blot-formatter";
import React from "react";

import "react-quill/dist/quill.snow.css";

Quill.register("modules/blotFormatter", BlotFormatter);

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"]
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  },
  blotFormatter: {}
};

const formats = [
  "header",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image"
];

const ReactQuillCustom = ({ value, onChange }) => (
  <ReactQuill
    modules={modules}
    formats={formats}
    theme="snow"
    readOnly={false}
    onChange={onChange}
    value={value}
  />
);

/*
const ReactQuillCustom = ({ value, onChange }) => {
  return (
    <ReactQuill
      modules={modules}
      formats={formats}
      theme="snow"
      readOnly={false}
      onChange={onChange}
      value={value}
    />
  );
};
*/
export default ReactQuillCustom;
