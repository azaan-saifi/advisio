import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="bg-dark-200">{children}</main>;
};

export default layout;
