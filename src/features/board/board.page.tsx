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

type ViewModelNode = {
  id: string;
  x: number;
  y: number;
  text: string;
  isSelected?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

type ViewModel = {
  nodes: ViewModelNode[];
  layout?: {
    onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  };
  canvas?: {
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  };
  actions?: {
    addSticker?: {
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
      isActive: boolean;
    };
  };
};

export const BoardPage = () => {
  const { nodes, addSticker } = useNodes();
  const viewModelLast = useViewModel();
  const { canvasRef, canvasRect } = useCanvasRect();
  const focusLayoutRef = useLayoutFocus();

  let viewModel: ViewModel;

  switch (viewModelLast.viewState.type) {
    case "add-sticker":
      viewModel = {
        nodes,
        layout: {
          onKeyDown: (e) => {
            if (e.key === "Escape") {
              viewModelLast.goToIdle();
            }
          },
        },
        canvas: {
          onClick: (e) => {
            if (!canvasRect) {
              return;
            }

            addSticker({
              text: "default",
              x: e.clientX - canvasRect.x,
              y: e.clientY - canvasRect?.y,
            });
            viewModelLast.goToIdle();
          },
        },
        actions: {
          addSticker: {
            isActive: true,
            onClick: () => {
              viewModelLast.goToIdle();
            },
          },
        },
      };
      break;
    case "idle": {
      const viewState = viewModelLast.viewState;
      viewModel = {
        nodes: nodes.map((node) => ({
          ...node,
          isSelected: viewState.selectedIds.has(node.id),
          onClick: (e) => {
            if (e.ctrlKey || e.shiftKey) {
              viewModelLast.selection([node.id], "toggle");
            } else {
              viewModelLast.selection([node.id], "replace");
            }
          },
        })),
        layout: {
          onKeyDown: (e) => {
            if (e.key === "s") {
              viewModelLast.goToAddSticker();
            }
          },
        },
        actions: {
          addSticker: {
            isActive: false,
            onClick: () => {
              viewModelLast.goToAddSticker();
            },
          },
        },
      };
      break;
    }
    default:
      throw new Error("Invalid view state");
  }

  return (
    <Layout ref={focusLayoutRef} onKeyDown={viewModel.layout?.onKeyDown}>
      <Canvas ref={canvasRef} onClick={viewModel.canvas?.onClick}>
        {viewModel.nodes.map((node) => (
          <Sticker
            key={node.id}
            x={node.x}
            y={node.y}
            text={node.text}
            onClick={node.onClick}
            selected={node.isSelected}
          />
        ))}
      </Canvas>
      <Actions>
        <ActionButton
          isActive={viewModel.actions?.addSticker?.isActive}
          onClick={viewModel.actions?.addSticker?.onClick}
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
  selected?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
  isActive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
