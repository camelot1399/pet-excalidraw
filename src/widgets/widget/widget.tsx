import { useMediator } from "@/context/mediator-context/mediator-context";
import React from "react";

interface WidgetProps {
  id: string;
  defaultColor: string;
  children: React.ReactNode;
}

export const Widget: React.FC<WidgetProps> = ({
  id,
  defaultColor,
  children,
}) => {
  const { activeId, setActiveId } = useMediator();
  const isActive = activeId === id;

  const background = isActive ? "green" : defaultColor;

  return (
    <div
      onClick={() => setActiveId(id)}
      style={{
        padding: "20px",
        borderRadius: "6px",
        color: "white",
        background,
        cursor: "pointer",
        textAlign: "center",
        minWidth: "100px",
      }}
    >
      {children}
    </div>
  );
};
