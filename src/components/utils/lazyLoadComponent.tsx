"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

const Loader = () => {
  return (
    <div className="mx-auto h-[107px] max-w-[1110px] animate-pulse bg-gray-400" />
  );
};

// Dynamic Imports
const NestedCommentsSystem = dynamic(() => import("../nestedCommentSystem"), {
  ssr: false,
  loading: () => <Loader />,
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

  return <div ref={ref}>{isVisible && Component && <Component />}</div>;
};

export default LazyLoadComponent;
