import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../../apis/urls";
import { useNavigate } from "react-router-dom";

const CardDoc = (props) => {
  const navigate = useNavigate();

  return (
    <div
      className="card flex flex-col md:flex-row p-4 md:p-6 min-h-[144px] border border-border rounded-xl hover:bg-slate-100 cursor-pointer transition-all duration-300"
      onClick={() => {
        navigate(`/template/${props.id}?custom=normal_user`);
      }}
      title={"open " + props.title}
    >
      <div className="icon flex-none w-10 h-10 md:w-14 md:h-14 p-2 bg-blue-700/10 rounded-xl">
        <img src={props.icon} alt="" className="block w-full" />
      </div>
      <div className="content relative flex-auto pl-2 md:pl-4">
        <div className="title mb-2">
          <h4 className="text-sm md:text-base font-bold leading-none">
            {props.title}
          </h4>
          {props.isPremium && (
            <span className="text-xs md:text-sm text-green py-1 px-2 bg-green/10 border border-green rounded-3xl">
              Premium
            </span>
          )}
        </div>
        <p className="text-xs md:text-sm">{props.description}</p>
      </div>
    </div>
  );
};

export default CardDoc;
