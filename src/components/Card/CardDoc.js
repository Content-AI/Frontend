const CardDoc = ({ icon, title, description, isPremium }) => {
  return (
    <div className="card flex p-6 border border-border rounded-xl">
      <div className="icon flex-none w-14 h-14 p-2 bg-blue-700/10 rounded-xl">
        <img src={icon} alt="" className="block w-full" />
      </div>
      <div className="content relative flex-auto pl-4">
        <div className="title flex items-center justify-between gap-2 mb-2">
          <h4 className="text-sm font-bold leading-none">{title}</h4>
          {isPremium && (
            <span className="text-xs text-green py-1 px-2 bg-green/10 border border-green rounded-3xl">
              Premium
            </span>
          )}
        </div>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default CardDoc;
