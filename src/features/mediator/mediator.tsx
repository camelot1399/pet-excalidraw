import { MediatorProvider } from "@/context/mediator-context/mediator-context";
import { Widget } from "@/widgets/widget/widget";
import React from "react";

const Mediator = () => {
  return (
    <MediatorProvider>
      <div style={{ display: "flex", gap: "10px" }}>
        <Widget id="1" defaultColor="blue">
          Виджет 1
        </Widget>
        <Widget id="2" defaultColor="orange">
          Виджет 2
        </Widget>
        <Widget id="3" defaultColor="gray">
          Виджет 3
        </Widget>
      </div>
    </MediatorProvider>
  );
};

export default Mediator;
