import { Rect } from "../domain/rect";

export type ViewModelNode = {
  id: string;
  x: number;
  y: number;
  text: string;
  isSelected?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export type ViewModel = {
  nodes: ViewModelNode[];
  selectionWindow?: Rect;
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
  overlay?: {
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  };
  window?: {
    onMouseUp?: (e: MouseEvent) => void;
    onMouseMove?: (e: MouseEvent) => void;
  };
};
