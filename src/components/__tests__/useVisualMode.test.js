import { renderHook, act } from "@testing-library/react-hooks";
import useVisualMode from "hooks/useVisualMode";


const FIRST = "FIRST";
const SECOND = "SECOND";
const THIRD = "THIRD";

// Check that useVisualMode initializes with the default value
test("useVisualMode should initialize with default value", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  expect(result.current.mode).toBe(FIRST);
});


// Check that useVisualMode transitions to another mode
test("useVisualMode should transition to another mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);
});


// Check that useVisualMode returns to the previous mode
test("useVisualMode should return to previous mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);

  act(() => result.current.transition(THIRD));
  expect(result.current.mode).toBe(THIRD);

  act(() => result.current.back());
  expect(result.current.mode).toBe(SECOND);

  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});


// Check that useVisualMode does not return to previous mode if already at initial
test("useVisualMode should not return to previous mode if already at initial", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  //  If at the initial mode, calling back should not change the mode
  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});