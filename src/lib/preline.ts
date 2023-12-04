"use client";
import { PropsWithChildren, useEffect } from "react";

const PrelineProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    require("preline");
  }, []);

  return children;
};

export default PrelineProvider;
