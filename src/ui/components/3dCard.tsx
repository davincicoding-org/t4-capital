"use client";

import type { CSSProperties, MouseEvent, ReactNode, Ref } from "react";
import { useRef } from "react";

import { cn } from "@/ui/utils";

export function CardContainer({
  children,
  className,
  disabled,
  containerClassName,
  ref,
}: {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  containerClassName?: string;
  ref?: Ref<HTMLDivElement>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (disabled) return;
    requestAnimationFrame(() => {
      if (!containerRef.current) return;

      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / 25;
      const y = (e.clientY - top - height / 2) / 25;
      containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });
  };

  return (
    <div
      className={cn("flex", containerClassName)}
      style={{
        perspective: "1000px",
      }}
      ref={ref}
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className={cn(
          "group relative flex w-full items-center transition-all duration-200 ease-linear not-hover:!rotate-x-0 not-hover:!rotate-y-0",
          className,
        )}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function CardBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("transform-3d *:transform-3d", className)}>
      {children}
    </div>
  );
}

export function CardItem({
  as: Tag = "div",
  children,
  className,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Tag
      className={cn("w-fit transition duration-200 ease-linear", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
