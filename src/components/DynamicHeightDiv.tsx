import React, { useState, useEffect, useRef } from "react";
import { onDocumentMutation } from "../helper/componentHelpers";

type DynamicHeightDiv = {
  children: React.ReactNode;
  visible?: boolean;
};

export default function DynamicHeightDiv({
  children,
  visible,
}: DynamicHeightDiv) {
  const divRef = useRef<null | HTMLDivElement>(null);
  const [divHeight, setDivHeight] = useState(0)

  const updateHeight = () => {
    const inner = () => {
      if (divRef.current) {
        let totalHeight = 0;
        const childrenArray = Array.from(divRef.current.children) as HTMLElement[];
        // console.log(childrenArray)
        childrenArray.forEach(child => {
          // console.dir(child.offsetHeight)
          totalHeight += child.offsetHeight;
        });
        setDivHeight(totalHeight);
      }
    }

    inner();
    setTimeout(() => {
      inner();
    }, 200);
  }

  useEffect(() => {
    updateHeight()
    window.addEventListener('resize', updateHeight);

    const observer = onDocumentMutation(() => { updateHeight(); console.log("second chance") })

    // ? Cleanup function
    return () => {
      updateHeight()
      observer.disconnect()
      window.removeEventListener('resize', updateHeight);
    };
  }, [children, visible]);

  useEffect(() => {
    console.log(`New Height: ${divHeight}`)
  })

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
