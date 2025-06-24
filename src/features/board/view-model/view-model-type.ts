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
