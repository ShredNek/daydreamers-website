import React, { useState, useEffect, useRef } from "react";

type DynamicHeightDiv = {
  children: React.ReactNode;
  visible: boolean;
};

export default function DynamicHeightDiv({
  children,
  visible,
}: DynamicHeightDiv) {
  const divRef = useRef<null | HTMLDivElement>(null);
  const [divHeight, setDivHeight] = useState(0)

  useEffect(() => {
    const updateHeight = () => {
      if (divRef.current) {
        let totalHeight = 0;
        const childrenArray = Array.from(divRef.current.children) as HTMLElement[];
        childrenArray.forEach(child => {
          totalHeight += child.offsetHeight;
        });
        setDivHeight(totalHeight);
      }
    }

    updateHeight()
    window.addEventListener('resize', updateHeight);

    // ? Cleanup function
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, [children, visible]);

  // useEffect(() => {
  //   console.log(`New Height: ${divHeight}`)
  // })

  const styles = { "--dynamic-height": `${divHeight}px` } as React.CSSProperties

  return (
    <div
      ref={divRef}
      style={styles}
      id="dynamic-height-parent"
      className={visible ? "fade-in" : "fade-out"}
    >
      {children}
    </div>
  );
}
