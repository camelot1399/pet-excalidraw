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

type AddedSticker = {
  text: string;
  x: number;
  y: number;
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

  const addSticker = ({ text, x, y }: AddedSticker): void => {
    setNodes([
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: "sticker",
        x,
        y,
        text,
      },
    ]);
  };

  return {
    nodes,
    addSticker,
  };
};

export type NodesModel = ReturnType<typeof useNodes>;
