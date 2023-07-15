import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import BlotFormatter from "quill-blot-formatter";
import "quill/dist/quill.snow.css";

const Editor = (props) => {
  // console.log("props",props)
  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} }
  });

  if (Quill && !quill) {
    Quill.register("modules/blotFormatter", BlotFormatter);
  }

  useEffect(() => {
    if (quill && props.datas) {
      quill.setContents(props.datas);
    }
  }, [quill, props.datas]);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldContents) => {
        // console.log(delta)
        let currentContents = quill.getContents();
      });
    }
  }, [quill]);

  return (
    <div>
      <div ref={quillRef} />
    </div>
  );
};

export default Editor;
