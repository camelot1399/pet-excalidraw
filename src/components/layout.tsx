import React, { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="layout" tabIndex={0}>
      {children}
    </div>
  );
};

export default Layout;
