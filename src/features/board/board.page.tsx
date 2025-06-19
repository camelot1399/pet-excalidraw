import Layout from "@/components/layout";
import React, {
  FC,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  Ref,
} from "react";
import { useNodes } from "./nodes";
import { useViewModel } from "./view-model";
import { useCanvasRect } from "./use-canvas-rect";
import { useLayoutFocus } from "./use-layout-focus";

export const BoardPage = () => {
  const { nodes, addSticker } = useNodes();
  const { viewState, goToAddSticker, goToIdle } = useViewModel();
  const { canvasRef, canvasRect } = useCanvasRect();
  const focusLayoutRef = useLayoutFocus();

  return (
    <Layout
      ref={focusLayoutRef}
      onKeyDown={(e) => {
        if (viewState.type === "add-sticker" && e.key === "Escape") {
          goToIdle();
        }

        if (viewState.type === "idle" && e.key === "s") {
          goToAddSticker();
        }
      }}
    >
      <Canvas
        ref={canvasRef}
        onClick={(e) => {
          if (viewState.type === "add-sticker" && canvasRect) {
            addSticker({
              text: "default",
              x: e.clientX - canvasRect.x,
              y: e.clientY - canvasRect?.y,
            });
            goToIdle();
          }
        }}
      >
        {nodes.map((node) => (
          <Sticker key={node.id} x={node.x} y={node.y} text={node.text} />
        ))}
      </Canvas>
      <Actions>
        <ActionButton
          isActive={viewState.type === "add-sticker"}
          onClick={() => {
            if (viewState.type === "add-sticker") {
              goToIdle();
            } else {
              goToAddSticker();
            }
          }}
        >
          add sticker
        </ActionButton>

        <ActionButton isActive={false} onClick={() => {}}>
          иконка 2
        </ActionButton>
      </Actions>
    </Layout>
  );
};

const Canvas = ({
  children,
  ref,
  ...props
}: {
  children: ReactNode;
  ref: Ref<HTMLDivElement>;
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div ref={ref} {...props} className="canvas">
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
