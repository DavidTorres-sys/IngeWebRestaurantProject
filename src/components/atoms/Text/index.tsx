import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Define the textVariants with variant and size options
const textVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "font-bold text-black",
        secondary: "font-medium text-gray-400",
      },
      size: {
        default: "text-base",
        sm: "text-sm",
        lg: "text-lg",
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    },
  }
);

// Define the TextProps interface to include the variants and any other text-related attributes
export interface TextProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof textVariants> {
  asChild?: boolean;
}

// Define the Text component with support for variants and the 'asChild' prop
const Text = React.forwardRef<HTMLDivElement, TextProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"; // Use 'div' as the default element
    return (
      <Comp
        className={cn(textVariants({ variant, size, className }))} // Apply the variant and size classes
        ref={ref}
        {...props}
      />
    );
  }
);

Text.displayName = "Text";

export { Text, textVariants };
