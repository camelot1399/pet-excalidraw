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
  const viewModel = useViewModel();
  const { canvasRef, canvasRect } = useCanvasRect();
  const focusLayoutRef = useLayoutFocus();

  return (
    <Layout
      ref={focusLayoutRef}
      onKeyDown={(e) => {
        if (viewModel.viewState.type === "add-sticker" && e.key === "Escape") {
          viewModel.goToIdle();
        }

        if (viewModel.viewState.type === "idle" && e.key === "s") {
          viewModel.goToAddSticker();
        }
      }}
    >
      <Canvas
        ref={canvasRef}
        onClick={(e) => {
          if (viewModel.viewState.type === "add-sticker" && canvasRect) {
            addSticker({
              text: "default",
              x: e.clientX - canvasRect.x,
              y: e.clientY - canvasRect?.y,
            });
            viewModel.goToIdle();
          }
        }}
      >
        {nodes.map((node) => (
          <Sticker
            key={node.id}
            x={node.x}
            y={node.y}
            text={node.text}
            onClick={(e) => {
              if (viewModel.viewState.type === "idle") {
                if (e.ctrlKey || e.shiftKey) {
                  viewModel.selection([node.id], "toggle");
                } else {
                  viewModel.selection([node.id], "replace");
                }
              }
            }}
            selected={
              viewModel.viewState.type === "idle" &&
              viewModel.viewState.selectedIds.includes(node.id)
            }
          />
        ))}
      </Canvas>
      <Actions>
        <ActionButton
          isActive={viewModel.viewState.type === "add-sticker"}
          onClick={() => {
            if (viewModel.viewState.type === "add-sticker") {
              viewModel.goToIdle();
            } else {
              viewModel.goToAddSticker();
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
  selected: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Sticker: FC<Sticker> = ({ x, y, text, selected, onClick }) => {
  return (
    <button
      className={["sticker", selected ? "sticker__selected" : ""].join(" ")}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      onClick={onClick}
    >
      {text}
    </button>
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
