import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-700">
      <div className="m-auto bg-slate-50 rounded-md w-2/4 md:w-1/3 h-4/4 grid lg:grid-cols-1">
        <div className="right flex flex-col justify-between">
          <div className="text-center py-10">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
