import { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import BlotFormatter from "quill-blot-formatter";
import "quill/dist/quill.snow.css";
import { BACKEND_URL,BACK_END_API_DOCUMENTS,BACK_END_API_DOCUMENTS_PATCH } from "../../../../apis/urls";
import { patchData } from "../../../../apis/apiService";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {_pre_len_text_,_now_len_text_} from '../../../../features/LengthOfEditorWord';

const Editor = (props) => {
  const { document_id } = useParams();
  const dispatch = useDispatch();
  
  let LENGTH_OF_WORD = useSelector(
    (state) => state.SetLengthOfEditorWord.LengthOfEditorWord
  );
  let TOKEN = useSelector(
    (state) => state.SetAuthenticationToken.AuthenticationToken
  );
  let PRE_LENGTH_OF_WORD = useSelector(
    (state) => state.SetLengthOfEditorWord.LengthOfEditorWord.preLen
  );
  let NOW_LENGTH_OF_WORD = useSelector(
    (state) => state.SetLengthOfEditorWord.LengthOfEditorWord.nowLen
  );

  const save_document_data = async(document_data) => {
    const formData={
      document_content:document_data
    }
    const resp=await patchData(formData,BACKEND_URL+BACK_END_API_DOCUMENTS_PATCH+"/"+document_id+"/",TOKEN)
  }


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
        let currentContents = quill.getContents();
        if(currentContents["ops"][0]["insert"]){
              dispatch(_now_len_text_(currentContents["ops"][0]["insert"].length))
          }
        save_document_data(currentContents["ops"][0]["insert"])
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
