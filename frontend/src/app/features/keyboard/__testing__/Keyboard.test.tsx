import { Keyboard } from "../Keyboard";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import wordReducer from "../../../features/word/wordSlice";
import { act, render } from "@testing-library/react";

const createTestStore = () =>
  configureStore({
    reducer: {
      word: wordReducer,
    },
  });

describe("Keyboard", () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  it("renders Keyboard correctly", () => {
    const { baseElement } = render(
      <Provider store={store}>
        <Keyboard />
      </Provider>,
    );
    expect(baseElement).toMatchSnapshot();
  });

  it("should handle keypress correctly - letter", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Keyboard />
      </Provider>,
    );
    const key = getByText("A");
    act(() => {
      key.click();
    });
    expect(store.getState().word.grid[0]).toBe("a");
  });

  it("should handle keypress correctly - backspace", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Keyboard />
      </Provider>,
    );
    let key = getByText("A");
    act(() => {
      key.click();
    });
    expect(store.getState().word.grid[0]).toBe("a");

    key = getByText("DELETE");
    act(() => {
      key.click();
    });
    expect(store.getState().word.grid[0]).toBe("");
  });

  it("should handle keypress correctly - enter", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Keyboard />
      </Provider>,
    );
    let key = getByText("A");
    act(() => {
      key.click();
    });
    expect(store.getState().word.grid[0]).toBe("a");

    key = getByText("ENTER");
    act(() => {
      key.click();
    });
    expect(store.getState().word.grid[0]).toBe("a");
  });
});
