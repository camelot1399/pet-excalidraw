import { NodesModel } from "../model/nodes";
import { CanvasRectReturn } from "../hooks/use-canvas-rect";
import { ViewStateModelReturn } from "../model/view-state";
import { useIdleViewModel } from "./variants/idle";
import { useAddStickerViewModel } from "./variants/add-sticker";

type ViewModelNode = {
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

export type UseViewModelParams = {
  viewStateModel: ViewStateModelReturn;
  nodesModel: NodesModel;
  canvasRect: CanvasRectReturn | undefined;
};

export const useViewModel = (params: UseViewModelParams) => {
  const addStickerViewModel = useAddStickerViewModel(params);
  const idleViewModel = useIdleViewModel(params);

  let viewModel: ViewModel;

  switch (params.viewStateModel.viewState.type) {
    case "add-sticker":
      viewModel = addStickerViewModel();
      break;
    case "idle": {
      viewModel = idleViewModel(params.viewStateModel.viewState);
      break;
    }
    default:
      throw new Error("Invalid view state");
  }

  return viewModel;
};
