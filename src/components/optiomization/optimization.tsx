"use client";

import React, { useState } from "react";

const Button = () => {
  const [state, setState] = useState(0);

  return (
    <div>
      <p>buton text: {state}</p>

      <button onClick={() => setState(state + 1)}>click me</button>
    </div>
  );
};

const Optimization = () => {
  return (
    <div>
      <div>some text</div>

      <div>
        {Array.from({ length: 1000 })
          .fill(0)
          .reduce((acc) => acc + Math.random(), 0)}
      </div>

      <Button />
    </div>
  );
};

export default Optimization;
