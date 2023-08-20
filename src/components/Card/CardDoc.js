import React,{useState,useEffect} from "react";
import { BACKEND_URL } from "../../apis/urls";
import { useNavigate } from "react-router-dom";

const CardDoc = (props) => {

  const navigate = useNavigate()

  return (
    <div className="card flex p-6 min-h-[144px] border border-border rounded-xl hover:bg-slate-100 cursor-pointer transition-all duration-300"
    onClick={()=>{
      navigate(`/template/${props.id}?custom=normal_user`)
    }}
    title={"open "+props.title}
    >
      <div className="icon flex-none w-14 h-14 p-2 bg-blue-700/10 rounded-xl">
        <img src={BACKEND_URL+props.icon} alt="" className="block w-full" />
      </div>
      <div className="content relative flex-auto pl-4">
        <div className="title flex items-center justify-between gap-2 mb-2">
          <h4 className="text-sm font-bold leading-none">{props.title}</h4>
          {props.isPremium && (
            <span className="text-xs text-green py-1 px-2 bg-green/10 border border-green rounded-3xl">
              Premium
            </span>
          )}
        </div>
        <p className="text-sm">{props.description}</p>
      </div>
    </div>
  );
};

export default CardDoc;
