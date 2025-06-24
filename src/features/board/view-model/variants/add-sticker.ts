// import { AddStickerViewState } from "../../model/view-state";

import { ViewModelParams } from "../use-view-model-params";
import { ViewModel } from "../view-model-type";

export const useAddStickerViewModel = ({
  nodesModel,
  viewStateModel,
  canvasRect,
}: ViewModelParams) => {
  return (): ViewModel => ({
    nodes: nodesModel.nodes,
    layout: {
      onKeyDown: (e) => {
        if (e.key === "Escape") {
          viewStateModel.goToIdle();
        }
      },
    },
    canvas: {
      onClick: (e) => {
        if (!canvasRect) {
          return;
        }

        nodesModel.addSticker({
          text: "default",
          x: e.clientX - canvasRect.x,
          y: e.clientY - canvasRect?.y,
        });
        viewStateModel.goToIdle();
      },
    },
    actions: {
      addSticker: {
        isActive: true,
        onClick: () => {
          viewStateModel.goToIdle();
        },
      },
    },
  });
};
