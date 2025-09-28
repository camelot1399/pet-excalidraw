import { Mediator } from "@/core/mediator";
import WidgetWithClassMediator from "@/widgets/widget-with-class-mediator/widget-with-class-mediator";
import React from "react";

const mediator = new Mediator();

const MediatorWithClass = () => {
  return (
    <div style={{ display: "flex" }}>
      <WidgetWithClassMediator id="1" defaultColor="blue" mediator={mediator} />
      <WidgetWithClassMediator
        id="2"
        defaultColor="orange"
        mediator={mediator}
      />
      <WidgetWithClassMediator id="3" defaultColor="gray" mediator={mediator} />
    </div>
  );
};

export default MediatorWithClass;
