import { useRef, WheelEvent } from "react";
import useScroll from "./useScroll";

/**
 * Handles the scroll wheel event to perform a horizontal scrolling action.
 *
 * @returns An object with three properties:
 * - ScrollRef: a mutable reference to the DOM element that will be scrolled.
 * - wheelHandler: an event handler that is called each time the wheel is scrolled.
 * - scrollToLeft: a function that can be called to scroll the element to the left.
 */
const useScrollWheel = () => {
  const { ScrollRef, scrollToLeft } = useScroll();
  const scrollNumber = useRef<number>(0);

  const wheelHandler = (e: WheelEvent<HTMLDivElement>) => {
    if (ScrollRef.current && e.deltaY === 100) {
      ScrollRef.current.scrollLeft =
        scrollNumber.current > ScrollRef.current.clientWidth
          ? ScrollRef.current.clientWidth
          : (scrollNumber.current += 10);
    }
    if (ScrollRef.current && e.deltaY === -100) {
      ScrollRef.current.scrollLeft =
        scrollNumber.current < 0 ? 0 : (scrollNumber.current -= 10);
    }
  };

  return { ScrollRef, wheelHandler, scrollToLeft };
};

export default useScrollWheel;
