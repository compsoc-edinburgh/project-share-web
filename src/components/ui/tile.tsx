import { ReactNode } from "react";

const Tile = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={`h-full w-full p-5 font-semibold ${className}`}>
      {children}
    </div>
  );
};

export default Tile;
