import Layout from "@/components/layout";
import React, { FC, HTMLAttributes, PropsWithChildren, ReactNode } from "react";
import { useNodes } from "./nodes";

export const BoardPage = () => {
  const { nodes, addSticker } = useNodes();

  return (
    <Layout>
      <Canvas>
        {nodes.map((node) => (
          <Sticker key={node.id} x={node.x} y={node.y} text={node.text} />
        ))}
      </Canvas>
      <Actions>
        <ActionButton isActive={false} onClick={() => addSticker()}>
          add sticker
        </ActionButton>

        <ActionButton isActive={false} onClick={() => {}}>
          иконка 2
        </ActionButton>
      </Actions>
    </Layout>
  );
};

interface Canvas {
  children: ReactNode;
}
const Canvas = ({
  children,
  ...props
}: {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className="canvas">
      {children}
    </div>
  );
};

interface Sticker {
  x: number;
  y: number;
  text: string;
}

const Sticker: FC<Sticker> = ({ x, y, text }) => {
  return (
    <div className="sticker" style={{ transform: `translate(${x}px, ${y}px)` }}>
      {text}
    </div>
  );
};

const Actions: FC<PropsWithChildren> = ({ children }) => {
  return <div className="actions">{children}</div>;
};

const ActionButton = ({
  children,
  isActive,
  onClick,
}: {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className={isActive ? "button button__active" : "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
