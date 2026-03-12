"use client";

import type { ComponentProps } from "react";
import type { ButtonProps } from "@heroui/react";

import React from "react";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { cn } from "@heroui/react";

export type RowStepProps = {
  title?: React.ReactNode;
  className?: string;
};

export interface RowStepsProps {
  steps?: RowStepProps[];
  color?: ButtonProps["color"];
  currentStep?: number;
  hideProgressBars?: boolean;
  className?: string;
  stepClassName?: string;
}

function CheckIcon(props: ComponentProps<"svg">) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <m.path
        animate={{ pathLength: 1 }}
        d="M5 13l4 4L19 7"
        initial={{ pathLength: 0 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        transition={{
          delay: 0.2,
          type: "tween",
          ease: "easeOut",
          duration: 0.3,
        }}
      />
    </svg>
  );
}

const RowSteps = React.forwardRef<HTMLDivElement, RowStepsProps>(
  (
    {
      color = "primary",
      steps = [],
      currentStep = 0,
      hideProgressBars = false,
      stepClassName,
      className,
    },
    ref,
  ) => {
    const colors = React.useMemo(() => {
      let userColor;
      let fgColor;

      const colorsVars = [
        "[--active-fg-color:var(--step-fg-color)]",
        "[--active-border-color:var(--step-color)]",
        "[--active-color:var(--step-color)]",
        "[--complete-background-color:#34cacc]",
        "[--complete-border-color:#34cacc]",
        "[--inactive-border-color:hsl(var(--heroui-default-300))]",
        "[--inactive-color:hsl(var(--heroui-default-300))]",
      ];

      switch (color) {
        case "secondary":
          userColor = "[--step-color:hsl(var(--heroui-secondary))]";
          fgColor = "[--step-fg-color:hsl(var(--heroui-secondary-foreground))]";
          break;
        case "success":
          userColor = "[--step-color:hsl(var(--heroui-success))]";
          fgColor = "[--step-fg-color:hsl(var(--heroui-success-foreground))]";
          break;
        case "warning":
          userColor = "[--step-color:hsl(var(--heroui-warning))]";
          fgColor = "[--step-fg-color:hsl(var(--heroui-warning-foreground))]";
          break;
        case "danger":
          userColor = "[--step-color:hsl(var(--heroui-error))]";
          fgColor = "[--step-fg-color:hsl(var(--heroui-error-foreground))]";
          break;
        default:
          userColor = "[--step-color:hsl(var(--heroui-primary))]";
          fgColor = "[--step-fg-color:hsl(var(--heroui-primary-foreground))]";
          break;
      }

      colorsVars.unshift(userColor);
      colorsVars.unshift(fgColor);
      colorsVars.push("[--inactive-bar-color:hsl(var(--heroui-default-300))]");

      return colorsVars;
    }, [color]);

    return (
      <nav
        ref={ref}
        aria-label="Progress"
        className="flex justify-center -my-4 py-4 "
      >
        <ol
          className={cn(
            "flex-row flex items-center justify-center flex-nowrap gap-x-3 ml-10 sm:ml-6 md:ml-6 lg:ml-8 xl:ml-10 2xl:ml-10",            
            colors,
            className,
          )}
        >
          {steps.map((step, stepIdx) => {
            const status =
              currentStep === stepIdx
                ? "active"
                : currentStep < stepIdx
                ? "inactive"
                : "complete";

            return (
              <li
                key={stepIdx}
                className="relative flex items-center pr-10 sm:pr-10 md:pr-10 lg:pr-10"
              >
                <div
                  className={cn(
                    "group rounded-large flex flex-row items-center justify-center gap-x-3 py-2.5",
                    stepClassName,
                  )}
                >
                  <div className="relative flex items-center">
                    <LazyMotion features={domAnimation}>
                      <m.div animate={status} className="relative">
                        <m.div
                          className="border-medium text-xs md:text-sm relative flex h-[30px] w-[30px] md:h-[36px] md:w-[36px] items-center justify-center rounded-full font-semibold"
                          initial={false}
                          transition={{ duration: 0.25 }}
                          variants={{
                            inactive: {
                              backgroundColor: "transparent",
                              borderColor: "#696768",
                              color: "#696768",
                            },
                            active: {
                              backgroundColor: "transparent",
                              borderColor: "#34cacc",
                              color: "#34cacc",
                            },
                            complete: {
                              backgroundColor: "var(--complete-background-color)",
                              borderColor: "var(--complete-border-color)",
                            },
                          }}
                        >
                          {status === "complete" ? (
                            <CheckIcon className="h-5 w-5 text-[var(--active-fg-color)]" />
                          ) : (
                            <span>{stepIdx + 1}</span>
                          )}
                        </m.div>
                      </m.div>
                    </LazyMotion>
                  </div>

                  {stepIdx < steps.length - 1 && !hideProgressBars && (
                    <div className="pointer-events-none absolute right-0 w-6 flex-none items-center">
                      <div
                        className={cn(
                          "relative h-0.5 w-5 bg-[#696768]",
                          "after:absolute after:block after:h-full after:w-0 after:bg-[#34cacc] after:transition-all after:duration-300 after:content-['']",
                          {
                            "after:w-full": stepIdx < currentStep,
                          },
                        )}
                      />
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

RowSteps.displayName = "RowSteps";

export default RowSteps;
