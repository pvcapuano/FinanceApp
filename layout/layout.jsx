import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-700">
      <div className="m-auto bg-slate-50 rounded-md w-2/4 h-3/4 grid lg:grid-cols-1">
        <div className="right flex flex-col justify-evenly">
          <div className="text-center py-10">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
