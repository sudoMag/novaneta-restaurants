import { useRef } from "react";

const useScroll = () => {
  const ScrollRef = useRef<HTMLElement | null>(null);

  const scrollToTop = (reverse?: boolean) => {
    if (ScrollRef.current !== null) {
      ScrollRef.current.scrollTop = reverse
        ? 0
        : ScrollRef.current.scrollHeight;
    }
  };

  const scrollToLeft = (reverse?: boolean) => {
    if (ScrollRef.current !== null) {
      ScrollRef.current.scrollTop = reverse
        ? 0
        : ScrollRef.current.scrollWidth;
    }
  };

  return { ScrollRef, scrollToTop, scrollToLeft };
};

export default useScroll;
