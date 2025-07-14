import { getStaticFilesPath } from "./staticPath";

const HLS_PATH_TAIL = "js/hls_v1.5.20.js";

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
      child.src = `${getStaticFilesPath()}/${HLS_PATH_TAIL}`;
    }

    return originalAppendChild.call(this, child) as T;
  };
};
