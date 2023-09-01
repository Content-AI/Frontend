import React, { useRef, useState, useCallback, useEffect } from "react";

// import tools for editor config
import { EDITOR_JS_TOOLS } from "./tools/tools";

// create editor instance
import { createReactEditorJS } from "react-editor-js";
import { patchData } from "../../../../../../apis/apiService";
import {
  BACKEND_URL,
  BACK_END_API_DOCUMENTS,
  BACK_END_API_DOCUMENTS_PATCH,
} from "../../../../../../apis/urls";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function Editor({ data, setData }) {
  const [activeBlock, setActiveBlock] = useState();
  const [activeBlockIndex, setActiveBlockIndex] = useState();
  const [isActive, setIsActive] = useState(false);

  const editorCore = useRef(null);

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

  const save_document_data = async (document_data) => {
    const formData = {
      document_content: document_data,
    };
    const resp = await patchData(
      formData,
      BACKEND_URL + BACK_END_API_DOCUMENTS_PATCH + "/" + document_id + "/",
      TOKEN
    );

    console.log("resp", resp);
  };

  const ReactEditorJS = createReactEditorJS();

  const handleInitialize = useCallback((instance) => {
    // await instance._editorJS.isReady;
    instance._editorJS.isReady
      .then(() => {
        // set reference to editor
        editorCore.current = instance;
      })
      .catch((err) => console.log("An error occured", err));
  }, []);

  const handleSave = useCallback(async () => {
    // retrieve data inserted
    const savedData = await editorCore.current.save();

    // console.log("savedData", savedData);
    savedData.blocks.forEach((item, index) => {
      if (item.data.text === "/") {
        var targetBlock = document.getElementsByClassName("ce-block");
        for (var i = 0; i < targetBlock.length; i++) {
          if (targetBlock[i].textContent.indexOf("/") > -1) {
            setIsActive(true);
            setActiveBlock(targetBlock[i]);
            setActiveBlockIndex(index);
            savedData.blocks[index].data.text = "Ullalala";
          }
        }
        // console.log("found /");
        // console.log(savedData.blocks.find((block) => block.id === item.id));
      }
    });
    // save data
    setData(savedData);
    save_document_data(savedData);
  }, [setData]);

  useEffect(() => {
    if (activeBlock) {
      activeBlock.classList.add("focus");
      activeBlock
        .getElementsByClassName("ce-paragraph")[0]
        .setAttribute("data-placeholder", "Type for content generation!");
      activeBlock.getElementsByClassName("ce-paragraph")[0].innerHTML = "";
      activeBlock.addEventListener("keydown", function (event) {
        console.log("pressed keydown");
        if (event.key === "Enter") {
          console.log("pressed Enter");
        }
      });
    }
    // console.log("Active Block", activeBlock);
    // console.log("isActive", isActive);
  }, [activeBlock]);

  return (
    <div className="editor-container">
      <ReactEditorJS
        onInitialize={handleInitialize}
        tools={EDITOR_JS_TOOLS}
        onChange={handleSave}
        defaultValue={data}
      />
    </div>
  );
}
