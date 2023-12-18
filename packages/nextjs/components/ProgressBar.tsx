import React from "react";

function ProgressBar({ description, percentage }: any) {
  return (
    <div className="grid grid-cols-6">
      <div className="md:col-span-3 sm:col-span-1  flex items-center">
        <p className=" text-gray-400 text-sm m-1"> {description}</p>
      </div>
      <div className="md:col-span-2 sm:col-span-1  flex items-center justify-start">
        <div className="h-2 bg-green-500 bg-gray-300" style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="md:col-span-1 flex items-center justify-center">
        <p className="m-1 ml-2">{percentage}%</p>
      </div>
    </div>
  );
}

export default ProgressBar;
