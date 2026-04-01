require("@testing-library/jest-dom");

if (typeof global.structuredClone !== "function") {
  global.structuredClone = (value) => {
    if (value === undefined) {
      return undefined;
    }

    return JSON.parse(JSON.stringify(value));
  };
}

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
