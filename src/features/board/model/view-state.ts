import { useState } from "react";
import { IdleViewState } from "../view-model/variants/idle";
import { AddStickerViewState } from "../view-model/variants/add-sticker";
import { selectItems } from "../domain/selection";

type ViewState = AddStickerViewState | IdleViewState;

export const useViewState = () => {
  const [viewState, setViewState] = useState<ViewState>({
    type: "idle",
    selectedIds: new Set(),
  });

  const goToIdle = () => {
    setViewState({ type: "idle", selectedIds: new Set() });
  };

  const goToAddSticker = () => {
    setViewState({ type: "add-sticker" });
  };

  const selection = (
    ids: string[],
    modif: "replace" | "add" | "toggle" = "replace"
  ) => {
    setViewState((s) => {
      if (s.type === "idle") {
        return selectItems(s, ids, modif);
      }

      return s;
    });
  };

  return {
    viewState,
    selection,
    goToIdle,
    goToAddSticker,
  };
};

export type ViewStateModelReturn = ReturnType<typeof useViewState>;
