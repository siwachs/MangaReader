"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

import LoadingSpinner from "./loadingSpinner";

// Dynamic Imports
const NestedCommentsSystem = dynamic(() => import("../nestedCommentSystem"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

type ComponentType = "NestedCommentSystem";

const LazyLoadComponent: React.FC<{ component: ComponentType }> = ({
  component,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (ref.current) observer.disconnect();
        }
      },
      {
        threshold: 0.01,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const getComponent = () => {
    if (component === "NestedCommentSystem") return NestedCommentsSystem;
  };

  const Component = getComponent();

  return (
    <div ref={ref}>
      {isVisible && Component ? <Component /> : <LoadingSpinner />}
    </div>
  );
};

export default LazyLoadComponent;
