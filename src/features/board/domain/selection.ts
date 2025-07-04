export type SetectionModifier = "replace" | "add" | "toggle";
export type Selection = Set<string>;

export const selectItems = (
  initialSelected: Selection,
  ids: string[],
  modif: SetectionModifier
): Selection => {
  if (modif === "replace") {
    return new Set(ids);
  }

  if (modif === "add") {
    return new Set([...initialSelected, ...ids]);
  }

  return initialSelected;

  // if (modif === 'toggle') {
  //   return {
  //     ...viewState,
  //     selectedIds: Array.from(new Set([...viewState.selectedIds, ...ids]))
  //   }
  // }
};
