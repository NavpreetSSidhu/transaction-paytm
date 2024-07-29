import React from "react";

const Appbar = () => {
  return (
    <div className="shadow h-14 flex justify-between ">
      <div className="flex flex-col justify-center h-full ml-4">PayTM App</div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">Hello</div>
        <div className="flex justify-center rounded-full h-12 w-12 bg-slate-200 mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">N</div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
