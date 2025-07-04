export const interceptAppendCHildInject = () => {
  const originalAppendChild = Element.prototype.appendChild;

  Element.prototype.appendChild = function <T extends Node>(
    this: Element,
    child: T
  ): T {
    if (
      child.nodeName === "SCRIPT" &&
      child instanceof HTMLScriptElement &&
      typeof child.src === "string" &&
      child.src.includes("hls.js@")
    ) {
      console.warn("modified hls src");
      child.src = "https://st.d14.championat.com/js/hls_v1.5.20.js";
    }

    return originalAppendChild.call(this, child) as T;
  };
};
