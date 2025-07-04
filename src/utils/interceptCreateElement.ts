export const interceptCreateElement = (): void => {
  const originalCreateElement = document.createElement.bind(document);

  document.createElement = function (
    tagName: string,
    ...args: any[]
  ): HTMLElement {
    const element = originalCreateElement(tagName, ...args);

    if (tagName.toLowerCase() === "script") {
      const scriptElement = element as HTMLScriptElement;

      const setSrc = Object.getOwnPropertyDescriptor(
        HTMLScriptElement.prototype,
        "src"
      )?.set;

      if (setSrc) {
        Object.defineProperty(scriptElement, "src", {
          set(value: string) {
            if (value.includes("gpt.js")) {
              console.warn("Blocked GPT.js:", value);
              return;
            }
            setSrc.call(this, value);
          },
          get() {
            return scriptElement.getAttribute("src");
          },
          configurable: true,
          enumerable: true
        });
      }
    }

    return element;
  };
};
