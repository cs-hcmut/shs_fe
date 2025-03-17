// RightSideDrawerForm.tsx

"use client";

import type { Theme, SxProps } from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";

import React, { forwardRef } from "react";

import { Slide, Dialog } from "@mui/material";

interface RightSideDrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  paperStyles?: SxProps<Theme>;
  shouldHaveEqualLevelWithHeader?: boolean;
}

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="left" ref={ref} {...props} />
);

export const RightSideDrawer: React.FC<RightSideDrawerProps> = ({
  open,
  onClose,
  title,
  children,
  paperStyles,
  shouldHaveEqualLevelWithHeader = false,
}) => {
  return (
    <Dialog
      keepMounted
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      sx={
        shouldHaveEqualLevelWithHeader
          ? {
              top: "72px",
              maxHeight: "calc(100vh - 72px)",
              height: "calc(100vh - 72px)",
              zIndex: 999, // Conditionally adjust z-index
            }
          : {
              zIndex: 1000, // Conditionally adjust z-index
            }
      }
      PaperProps={{
        sx: {
          position: "absolute",
          right: 0,
          margin: 0,
          borderRadius: 0,
          minWidth: "900px",
          height: shouldHaveEqualLevelWithHeader
            ? "calc(100vh - 72px)"
            : "100vh", // Adjust height to avoid overflow
          maxHeight: shouldHaveEqualLevelWithHeader
            ? "calc(100vh - 72px)"
            : "100vh", // Prevent overflow beyond viewport
          overflow: "visible",
          zIndex: 1000, // Conditionally adjust z-index
          ...paperStyles,
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            zIndex: 1000, // Ensure backdrop is below the header if condition matches
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional backdrop color
            position: "absolute",
            // top: '72px', // Start the backdrop below the header
            // height: 'calc(100vh - 72px)',
            width: "100%",
          },
        },
      }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 flex items-center justify-center p-2 rounded-full bg-white -left-4 -translate-x-full"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="#717680"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="overflow-auto h-full bg-white shadow flex-col justify-start flex">
        <div className="flex flex-col flex-grow">
          {title && (
            <div className="flex flex-col gap-6 p-8">
              <p className="text-primary-900 font-semibold text-2xl">{title}</p>
            </div>
          )}
          {children}
        </div>
      </div>
    </Dialog>
  );
};
