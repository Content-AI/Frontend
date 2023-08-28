import React, { useEffect, useState } from "react";
import { BACKEND_URL, BACK_END_API_DOCUMENTS } from "../../../../apis/urls";
import { patchData } from "../../../../apis/apiService";

const SelectOptionsTemplate = (props) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [colorIt, setcolorIt] = useState("bg-black");

  const options = [
    { text: "Done", color: "bg-green-800" },
    { text: "Working", color: "bg-green-600" },
    { text: "Publish", color: "bg-green-800" },
    { text: "Draft", color: "bg-blue-400" },
    { text: "Urgent", color: "bg-red-700" },
    { text: "Pending", color: "bg-red-500" },
  ];

  const updateStatus = async (id, option, TOKEN) => {
    const formData = {
      status: option,
    };
    const resp = await patchData(
      formData,
      BACKEND_URL + BACK_END_API_DOCUMENTS + "/" + id + "/",
      TOKEN
    );
  };

  useEffect(() => {
    // Find the selected option object
    const selectedText = options.find((option) => option.text === selectedOption);

    if (selectedText) {
      setcolorIt(selectedText.color);
      updateStatus(props.id, selectedOption, props.TOKEN);
    }
  }, [selectedOption]);

  useEffect(() => {
    // Find the selected option object by comparing with props
    const selectedText = options.find(
      (option) => option.text === props.options_selected.status
    );

    if (selectedText) {
      setcolorIt(selectedText.color);
      setSelectedOption(selectedText.text);
    }
  }, [props.options_selected.status]); // Trigger this effect when status changes in props

  return (
    <>
      <select
        className={`${colorIt} text-white rounded-full text-[12px] w-[70px] h-[25px] font-bold  text-center appearance-none`}
        value={selectedOption} // Use value to control selected option
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.text} value={option.text}>
            {option.text}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectOptionsTemplate;
