import { ViewModelParams } from "../use-view-model-params";
import { ViewModel } from "../view-model-type";

export type IdleViewState = {
  type: "idle";
  selectedIds: Set<string>;
  mouseDown?: {
    x: number;
    y: number;
  };
};

export const useIdleViewModel = ({
  viewStateModel,
  nodesModel,
}: ViewModelParams) => {
  return (idleState: IdleViewState): ViewModel => ({
    selectionWindow: {
      x: 100,
      y: 100,
      width: 100,
      height: 200,
    },
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
    overlay: {
      onMouseDown: (e) => {
        console.log("onM", e);
      },
      onMouseMove: (e) => {
        console.log("mouse move", e);
      },
    },
    window: {},
  });
};
