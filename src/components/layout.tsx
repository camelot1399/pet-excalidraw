import React, { FC, HTMLAttributes, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren & HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return (
    <div className="layout" tabIndex={0} {...props}>
      {children}
    </div>
  );
};

export default Layout;
