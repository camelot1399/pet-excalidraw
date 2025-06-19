import React, { HTMLAttributes, ReactNode, Ref } from "react";

const Layout = ({
  children,
  ref,
  ...props
}: {
  children: ReactNode;
  ref: Ref<HTMLDivElement>;
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div ref={ref} className="layout" tabIndex={0} {...props}>
      {children}
    </div>
  );
};

export default Layout;
