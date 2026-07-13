import { cva, type VariantProps } from "class-variance-authority";
import { NavLink } from "react-router";
import { cn } from "../../lib/utils";
import { type ComponentProps } from "react";

const navLinkStyles = cva(
  "rounded-lg bg-sky-600 px-4 py-2 text-white font-medium hover:bg-sky-700 transition",
  {
    variants: {
      intent: {
        primary: ["rounded-lg", "bg-sky-600", "hover:bg-sky-700"],
        secondary: [
          "rounded-md",
          "bg-sky-100",
          "text-sky-700",
          "hover:bg-sky-200",
        ],
        tertiary: [
          "rounded-sm",
          "bg-sky-100",
          "text-sky-700",
          "hover:bg-sky-200",
        ],
      },
      size: {
        small: ["px-2", "py-1", "text-sm"],
        medium: ["px-3", "py-2", "text-sm"],
        large: ["px-4", "py-2", "text-md"],
      },
      disabled: {
        false: null,
        true: ["opacity-50", "cursor-not-allowed"],
      },
      defaultVariants: {
        intent: "primary",
        size: "large",
        disabled: false,
      },
    },
  },
);

type NavLinkComponentProps = ComponentProps<typeof NavLink> &
  VariantProps<typeof navLinkStyles> & {
    className: string;
  };

export function NavLinkComponent({
  intent,
  size,
  disabled,
  className,
  children,
  ...props
}: NavLinkComponentProps) {
  return (
    <NavLink
      className={cn(navLinkStyles({ intent, size, disabled }), className)}
      {...props}
    >
      {children}
    </NavLink>
  );
}
