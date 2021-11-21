import { useEffect, useState } from "react";

export const useViewport = () => {
  const validWidth =
    window.innerWidth || document.documentElement || document.body.clientWidth;
  const [width, setWidth] = useState(validWidth);

  useEffect(() => {
    const validWidth =
      window.innerWidth ||
      document.documentElement ||
      document.body.clientWidth;
    const handleWindowResize = () => setWidth(validWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  console.log(width);
  return width;
};
