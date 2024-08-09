import React, { ReactNode, useEffect, useRef } from "react";

interface ClickOutsideListenerProps {
  className?: string;
  onClickOutside: () => void;
  children: ReactNode;
}

const MagicDiv: React.FC<ClickOutsideListenerProps> = ({
  onClickOutside,
  children,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default MagicDiv;
