import React, { useRef, useState, useCallback, useEffect } from "react";

// import tools for editor config
import { EDITOR_JS_TOOLS } from "./tools/tools";

// create editor instance
import { createReactEditorJS } from "react-editor-js";
import { postData, patchData } from "../../../../../../apis/apiService";
import {
  BACKEND_URL,
  BACK_END_API_DOCUMENTS_QUESTION,
  BACK_END_API_DOCUMENTS,
  BACK_END_API_DOCUMENTS_PATCH,
} from "../../../../../../apis/urls";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { current } from "@reduxjs/toolkit";

export default function Editor({ data, setData }) {
  const [activeBlock, setActiveBlock] = useState();
  const [activeBlockIndex, setActiveBlockIndex] = useState();
  const [isActive, setIsActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");

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
  };

  const post_document_data = async (document_data) => {
    if (currentQuestion) {
      const formData = {
        ask: document_data,
      };
      const resp = await postData(
        formData,
        BACKEND_URL + BACK_END_API_DOCUMENTS_QUESTION + "/",
        TOKEN
      );

      if (resp.status === 200 || resp.status === 201) {
        setCurrentQuestion(null);
        setCurrentAnswer(resp.data.data);
      }
    }
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

  const handleSave = useCallback(
    async (instance) => {
      // retrieve data inserted
      const savedData = await editorCore.current.save();
      const targetBlock = document.getElementsByClassName("ce-block");

      savedData.blocks.forEach((item, index) => {
        if (item.data.text === "/") {
          if (isActive) {
            return;
          }
          setIsActive(true);
          setActiveBlock(targetBlock[index]);
          setActiveBlockIndex(index);
          savedData.blocks[index].data.text = "";
          instance.blocks.render(savedData);

          setTimeout(function () {
            targetBlock[index].classList.add("active");
            targetBlock[index]
              .getElementsByClassName("ce-paragraph")[0]
              .focus();
          }, 500);
        }
      });

      setData(savedData);
      save_document_data(savedData);
    },
    [setData]
  );

  useEffect(() => {
    document.addEventListener("keydown", function (event) {
      if (isActive && activeBlockIndex) {
        if (event.key === "Enter") {
          const targetBlock =
            document.getElementsByClassName("ce-block")[activeBlockIndex];

          setCurrentQuestion(
            targetBlock.getElementsByClassName("ce-paragraph")[0].innerHTML
          );
          setIsActive(false);
        }
      }
    });

    if (!isActive && activeBlockIndex) {
      const targetBlock =
        document.getElementsByClassName("ce-block")[activeBlockIndex];

      targetBlock.getElementsByClassName("ce-paragraph")[0].innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" > <circle cx="18" cy="12" r="0" fill="currentColor"> <animate attributeName="r" begin=".67" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/> </circle> <circle cx="12" cy="12" r="0" fill="currentColor"> <animate attributeName="r" begin=".33" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/> </circle> <circle cx="6" cy="12" r="0" fill="currentColor"> <animate attributeName="r" begin="0" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/> </circle> </svg>';
      post_document_data(currentQuestion);
    }
  }, [isActive]);

  useEffect(() => {
    if (currentAnswer && activeBlockIndex) {
      const targetBlock =
          document.getElementsByClassName("ce-block")[activeBlockIndex],
        textWrapper = targetBlock.getElementsByClassName("ce-paragraph")[0];

      targetBlock.classList.remove("active");
      textWrapper.innerHTML = currentAnswer;

      // setActiveBlock(null);
      // setActiveBlockIndex(null);
      // setIsActive(false);
      // setCurrentQuestion(null);
      // setCurrentAnswer(null);
    }
  }, [currentAnswer]);

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
