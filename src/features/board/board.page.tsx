import Layout from "@/components/layout";
import React, {
  FC,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  Ref,
} from "react";
import { useNodes } from "./model/nodes";
import { useCanvasRect } from "./hooks/use-canvas-rect";
import { useLayoutFocus } from "./hooks/use-layout-focus";
import { useViewModel } from "./view-model/use-view-model";
import { useViewState } from "./model/view-state";

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
