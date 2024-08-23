import { RefObject, useCallback, useEffect, useRef, useState } from "react";

type Position = {
  x: number;
  y: number;
};

const useDraggable = (ref: RefObject<HTMLElement>) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startOffset = useRef<Position>({ x: 0, y: 0 });

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      setIsDragging(true);
      startOffset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    },
    [position]
  );

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - startOffset.current.x,
          y: e.clientY - startOffset.current.y,
        });
      }
    },
    [startOffset, isDragging]
  );

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (element && isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    } else {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [ref, onMouseMove, onMouseUp, isDragging]);

  return {
    position,
    onMouseDown,
  };
};

export default useDraggable;
