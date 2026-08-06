import React from "react";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export default function Container({
  children,
  className = "",
  ...props
}: ContainerProps) {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute
          -top-16 -left-16
          sm:-top-20 sm:-left-20
          md:-top-28 md:-left-28
          lg:-top-36 lg:-left-36
          w-40 h-40
          sm:w-56 sm:h-56
          md:w-72 md:h-72
          lg:w-96 lg:h-96
          rounded-full bg-purple-600/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute
          -bottom-16 -right-16
          sm:-bottom-20 sm:-right-20
          md:-bottom-28 md:-right-28
          lg:-bottom-36 lg:-right-36
          w-40 h-40
          sm:w-56 sm:h-56
          md:w-72 md:h-72
          lg:w-96 lg:h-96
          rounded-full bg-blue-600/20 blur-3xl"
      />

      <div
        className={`relative z-10 animate-fade-in-blur container mx-auto max-w-6xl px-4 ${className}`}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
