import { useEffect, useState } from "react";

type IDimensions = {
  width: number;
  height: number;
};

function getWindowDimensions(): IDimensions {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

export const useViewport = (): IDimensions => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleWindowResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return windowDimensions;
};
