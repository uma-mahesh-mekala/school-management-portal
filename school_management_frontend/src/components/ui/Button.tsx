import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonStyles = cva("rounded-md transition", {
  variants: {
    intent: {
      primary: ["bg-sky-600", "hover:bg-sky-700", "text-white"],
      secondary: ["bg-sky-100", "hover:bg-sky-200"],
      tertiary: [
        "border",
        "border-slate-300",
        "hover:bg-slate-50",
        "text-slate-700",
      ],
    },
    size: {
      small: ["rounded-sm", "text-sm", "font-normal", "px-2", "py-2"],
      medium: ["rounded-md", "text-sm", "font-medium", "px-4", "py-2"],
      large: ["rounded-lg", "text-lg", "font-semibold", "px-5", "py-2"],
    },
    disabled: {
      false: null,
      true: ["opacity-50", "cursor-not-allowed"],
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "large",
    disabled: false,
  },
});

export interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof buttonStyles> {
  className: string;
}

export function Button({
  intent,
  size,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(buttonStyles({ intent, size, disabled }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
