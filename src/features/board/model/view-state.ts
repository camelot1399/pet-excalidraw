import { useState } from "react";

export type AddStickerViewState = {
  type: "add-sticker";
};

export type IdleViewState = {
  type: "idle";
  selectedIds: Set<string>;
};

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

const selectItems = (
  viewState: IdleViewState,
  ids: string[],
  modif: "replace" | "add" | "toggle" = "replace"
) => {
  if (modif === "replace") {
    return {
      ...viewState,
      selectedIds: new Set(ids),
    };
  }

  if (modif === "add") {
    return {
      ...viewState,
      selectedIds: new Set([...viewState.selectedIds, ...ids]),
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
