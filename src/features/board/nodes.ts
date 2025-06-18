import { useState } from "react";

type NodeBase = {
  id: string;
  type: string;
};

type StickerNode = NodeBase & {
  x: number;
  y: number;
  type: "sticker";
  text: string;
};

export const useNodes = () => {
  const [nodes, setNodes] = useState<StickerNode[]>([
    {
      id: "1",
      type: "sticker",
      x: 100,
      y: 100,
      text: "привет",
    },
    {
      id: "2",
      type: "sticker",
      x: 200,
      y: 200,
      text: "привет2",
    },
  ]);

  const addSticker = (): void => {
    setNodes([
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: "sticker",
        x: 400,
        y: 500,
        text: "hello " + crypto.randomUUID(),
      },
    ]);
  };

  return {
    nodes,
    addSticker,
  };
};
