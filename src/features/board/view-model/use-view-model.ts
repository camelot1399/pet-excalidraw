import { useIdleViewModel } from "./variants/idle";
import { useAddStickerViewModel } from "./variants/add-sticker";
import { ViewModel } from "./view-model-type";
import { ViewModelParams } from "./use-view-model-params";

export type ViewModelNode = {
  id: string;
  x: number;
  y: number;
  text: string;
  isSelected?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const useViewModel = (params: ViewModelParams) => {
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
