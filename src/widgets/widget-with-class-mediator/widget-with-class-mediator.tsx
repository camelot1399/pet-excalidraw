import React, { FC, useEffect, useState } from "react";
import { Mediator } from "@/core/mediator/Mediator";
import { WidgetEventEnum } from "@/core/mediator";

interface Props {
  id: string;
  defaultColor: string;
  mediator: Mediator;
}

const WidgetWithClassMediator: FC<Props> = ({ id, defaultColor, mediator }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    mediator.register({ id, setActive: setIsActive });
  }, [id, mediator]);

  const handleClick = () =>
    mediator.notify({ id, setActive: setIsActive }, WidgetEventEnum.activate);

  return (
    <div
      onClick={handleClick}
      style={{
        background: isActive ? "green" : defaultColor,
        color: "white",
        padding: "20px",
        margin: "10px",
        borderRadius: "8px",
        cursor: "pointer",
        textAlign: "center",
        width: "100px",
      }}
    >
      Виджет {id}
    </div>
  );
};

export default WidgetWithClassMediator;
