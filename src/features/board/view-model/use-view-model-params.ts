import { CanvasRectReturn } from "../hooks/use-canvas-rect";
import { NodesModel } from "../model/nodes";
import { ViewStateModelReturn } from "../model/view-state";

export type ViewModelParams = {
  viewStateModel: ViewStateModelReturn;
  nodesModel: NodesModel;
  canvasRect: CanvasRectReturn | undefined;
};
