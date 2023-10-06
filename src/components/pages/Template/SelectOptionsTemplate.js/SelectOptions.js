import React, { useEffect, useState } from "react";
import { BACKEND_URL, BACK_END_API_DOCUMENTS } from "../../../../apis/urls";
import { patchData } from "../../../../apis/apiService";

const SelectOptionsTemplate = (props) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [colorIt, setcolorIt] = useState("bg-black");

  const options = [
    { text: "Completed", color: "text-green-700 border border-green-500 bg-green-200 " },
    { text: "Working", color: "text-green-700 border border-green-500 bg-green-300 " },
    { text: "Publish", color: "text-green-700 border border-green-500 bg-green-300 " },
    { text: "Draft", color: "text-blue-700 border border-blue-500 bg-blue-200 " },
    { text: "Urgent", color: "text-red-700 border border-red-500 bg-red-200 " },
    { text: "Pending", color: "text-red-700 border border-red-500 bg-red-200 " },
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

  const handleSelectChange = (e) => {
    const newSelectedOption = e.target.value;
    setSelectedOption(newSelectedOption);
    const selectedText = options.find((option) => option.text === newSelectedOption);
    if (selectedText) {
      setcolorIt(selectedText.color);
      updateStatus(props.id, newSelectedOption, props.TOKEN);
    }
  };

  useEffect(() => {
    const selectedText = options.find(
      (option) => option.text === props.options_selected.status
    );

    if (selectedText) {
      setcolorIt(selectedText.color);
      setSelectedOption(selectedText.text);
    }
  }, [props.options_selected.status]);

  return (
    <>
      <select
        className={`${colorIt} rounded-full text-[12px] w-[74px] h-[28px] font-bold  text-center appearance-none`}
        value={selectedOption}
        onChange={handleSelectChange}
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
