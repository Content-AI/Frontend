import React, { useEffect, useState } from "react";
import { BACKEND_URL,BACK_END_API_DOCUMENTS } from "../../../../apis/urls";
import { patchData, postData } from "../../../../apis/apiService";
const SelectOptionsTemplate = (props) => {


  const [selectedOption, setSelectedOption] = useState("");
  const [colorIt, setcolorIt] = useState("bg-black");
  
  const [options, setoptions] = useState([
    { text: "Done", color: "bg-green-800" },
    { text: "Working", color: "bg-green-600" },
    { text: "Publish", color: "bg-green-800" },
    { text: "Draft", color: "bg-blue-400" },
    { text: "Urgent", color: "bg-red-700" },
    { text: "Pending", color: "bg-red-500" },
  ]);


  const update_status = async(id,options,TOKEN) =>{
    const formData = {
      status:options
    }
    const resp = await patchData(formData,BACKEND_URL+BACK_END_API_DOCUMENTS+"/"+id+"/",TOKEN)
  }
  
  useEffect(() => {
    const selectedText = options.find((option) => option.text === selectedOption);
    if (selectedText) {
      setcolorIt(selectedText.color)
      update_status(props.id,selectedOption,props.TOKEN)
      
    }
  }, [selectedOption]);


  useEffect(()=>{
    
    const selectedText = options.find((option) => option.text === props.options_selected.status);
    if (selectedText) {
      setcolorIt(selectedText.color)
      setSelectedOption(selectedText.text)
      const filteredOptions = options.filter(option => option.text !== props.options_selected.status);
      setoptions(filteredOptions)
    }

  },[])

  return (
    <>
        <select
          className={`${colorIt} text-white rounded-full text-[12px] w-[70px] h-[25px] font-bold  text-center appearance-none`}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="">{selectedOption}</option>
          {options.map((option) => (
            <option
              key={option.text}
              value={option.text}
            >
              {option.text}
            </option>
          ))}
        </select>
        </>
  );
};

export default SelectOptionsTemplate;
