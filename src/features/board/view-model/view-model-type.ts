import { ViewModelNode } from "./use-view-model";

export type ViewModel = {
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
