import Layout from "@/components/layout";
import React, {
  FC,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  Ref,
} from "react";
import { useNodes } from "./model/nodes";

import { useLayoutFocus } from "./hooks/use-layout-focus";
import { useViewModel } from "./view-model/use-view-model";
import { useViewState } from "./model/view-state";
import { useCanvasRect } from "./hooks/use-canvas-rect";
import { Rect } from "./domain/rect";
import { useWindowEvents } from "./hooks/use-window-events";

export const BoardPage = () => {
  const nodesModel = useNodes();
  const viewStateModel = useViewState();
  const { canvasRef, canvasRect } = useCanvasRect();
  const focusLayoutRef = useLayoutFocus();

  const viewModel = useViewModel({
    viewStateModel,
    nodesModel,
    canvasRect,
  });

  useWindowEvents(viewModel);

  return (
    <Layout ref={focusLayoutRef} {...viewModel.layout}>
      <Canvas ref={canvasRef} {...viewModel.canvas}>
        <Overlay {...viewModel.overlay} />
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

      {viewModel.selectionWindow && (
        <SelectionWindow {...viewModel.selectionWindow} />
      )}
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

const Overlay = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className="overlay" {...props}></div>;
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

const SelectionWindow = ({ x, y, width, height }: Rect) => {
  return (
    <div
      className="rect"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        width,
        height,
        background: "red",
        border: "1px solid blue",
      }}
    ></div>
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
