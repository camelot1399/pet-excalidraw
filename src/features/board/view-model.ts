import { useState } from "react";

type AddStickerViewState = {
  type: "add-sticker";
};

type IdleViewState = {
  type: "idle";
  selectedIds: string[];
};

type ViewState = AddStickerViewState | IdleViewState;

export const useViewModel = () => {
  const [viewState, setViewState] = useState<ViewState>({
    type: "idle",
    selectedIds: [],
  });

  const goToIdle = () => {
    setViewState({ type: "idle", selectedIds: [] });
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

const selectItems = (
  viewState: IdleViewState,
  ids: string[],
  modif: "replace" | "add" | "toggle" = "replace"
) => {
  if (modif === "replace") {
    return {
      ...viewState,
      selectedIds: ids,
    };
  }

  if (modif === "add") {
    return {
      ...viewState,
      selectedIds: Array.from(new Set([...viewState.selectedIds, ...ids])),
    };
  }

  return viewState;

  // if (modif === 'toggle') {
  //   return {
  //     ...viewState,
  //     selectedIds: Array.from(new Set([...viewState.selectedIds, ...ids]))
  //   }
  // }
};
