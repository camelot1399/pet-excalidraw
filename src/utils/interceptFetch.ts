const fakeConfig = {
  gpid: "", // Google Publisher ID
  settings: {} // может быть пустым
};

export const interceptFetch = () => {
  const originalFetch = window.fetch;

  window.fetch = function (...args) {
    const [input] = args;

    if (typeof input === "string" && input.includes("ppub_config")) {
      console.warn("Rejected request:", input);

      return Promise.resolve(
        new Response(JSON.stringify(fakeConfig), {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          }
        })
      );
    }

    return originalFetch.apply(this, args);
  };
};
