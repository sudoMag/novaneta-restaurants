import { useRef, WheelEvent } from "react";
import useScroll from "./useScroll";

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

  return {ScrollRef, wheelHandler, scrollToLeft};
}

export default useScrollWheel;
