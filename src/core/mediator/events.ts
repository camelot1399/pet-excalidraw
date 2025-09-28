export enum WidgetEventEnum {
  activate = "activate",
  deactivate = "deactivate",
}

export type WidgetEvent = WidgetEventEnum.activate | WidgetEventEnum.deactivate;

export interface Widget {
  id: string;
  setActive: (active: boolean) => void;
}
