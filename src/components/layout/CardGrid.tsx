import React from "react";

interface CardGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  className?: string;
}

const CardGrid: React.FC<CardGridProps> = ({
  children,
  columns = 3,
  gap = "md",
  className = "",
}) => {
  const getGridClasses = () => {
    const columnClasses = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    };

    const gapClasses = {
      sm: "gap-3",
      md: "gap-6",
      lg: "gap-8",
    };

    return `grid ${columnClasses[columns]} ${gapClasses[gap]}`;
  };

  return (
    <div className={`${getGridClasses()} ${className}`}>
      {children}
    </div>
  );
};

export default CardGrid;
