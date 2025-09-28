import { Widget, WidgetEvent, WidgetEventEnum } from "./events";

export class Mediator {
  private widgets: Widget[] = [];

  register(widget: Widget) {
    this.widgets.push(widget);
  }

  notify(sender: Widget, event: WidgetEvent) {
    if (event == WidgetEventEnum.activate) {
      this.widgets.forEach((w) => w.setActive(w.id === sender.id));
    }

    if (event === WidgetEventEnum.deactivate) {
      sender.setActive(false);
    }
  }
}
