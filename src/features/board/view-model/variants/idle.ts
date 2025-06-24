import { IdleViewState } from "../../model/view-state";
import { UseViewModelParams, ViewModel } from "../use-view-model";

export const useIdleViewModel = ({
  viewStateModel,
  nodesModel,
}: UseViewModelParams) => {
  return (idleState: IdleViewState): ViewModel => ({
    nodes: nodesModel.nodes.map((node) => ({
      ...node,
      isSelected: idleState.selectedIds.has(node.id),
      onClick: (e) => {
        if (e.ctrlKey || e.shiftKey) {
          viewStateModel.selection([node.id], "toggle");
        } else {
          viewStateModel.selection([node.id], "replace");
        }
      },
    })),
    layout: {
      onKeyDown: (e) => {
        if (e.key === "s") {
          viewStateModel.goToAddSticker();
        }
      },
    },
    actions: {
      addSticker: {
        isActive: false,
        onClick: () => {
          viewStateModel.goToAddSticker();
        },
      },
    },
  });
};
