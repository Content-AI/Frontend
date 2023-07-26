import React, { useRef, useCallback } from "react";

// import tools for editor config
import { EDITOR_JS_TOOLS } from "./tools/tools";

// create editor instance
import { createReactEditorJS } from "react-editor-js";
import { patchData } from "../../../../../../apis/apiService";
import { BACKEND_URL,BACK_END_API_DOCUMENTS,BACK_END_API_DOCUMENTS_PATCH } from "../../../../../../apis/urls";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

export default function Editor({ data, setData }) {
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
	
	const save_document_data = async(document_data) => {
	const formData={
		document_content:document_data
	}
	const resp=await patchData(formData,BACKEND_URL+BACK_END_API_DOCUMENTS_PATCH+"/"+document_id+"/",TOKEN)
	// const resp=await patchData(formData,"http://localhost:8000/admin/documentsData/documents/"+"/"+document_id+"/",TOKEN)
	}

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
		// save data
		setData(savedData);
		save_document_data(savedData)

	}, [setData]);

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
