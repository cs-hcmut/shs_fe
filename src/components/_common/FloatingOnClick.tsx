import {
  arrow,
  offset,
  shift,
  useFloating,
  useInteractions,
  type Placement,
  useDismiss,
  useHover,
  safePolygon,
  FloatingArrow,
} from "@floating-ui/react";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { ElementType, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  renderPopover: React.ReactNode;
  className?: string;
  as?: ElementType;
  initialOpen?: boolean;
  colorCode?: string;
  placement?: Placement;
  handleClick?: () => void;
  openChange?: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen?: boolean;
  offsetValue?: number;
}

export default function FloatingOnClick({
  children,
  className,
  renderPopover,
  as: Element = "div",
  placement,
  isOpen,
  offsetValue = 12,
  openChange,
}: Props) {
  const arrowRef = useRef(null);
  const { x, y, refs, middlewareData, context, strategy } = useFloating({
    open: isOpen,
    onOpenChange: openChange,
    middleware: [offset(offsetValue), shift(), arrow({ element: arrowRef })],
    placement: placement || "bottom",
  });
  // const click = useClick(context)
  const dismiss = useDismiss(context);

  const hover = useHover(context, {
    handleClose: safePolygon({
      requireIntent: false,
      blockPointerEvents: true,
    }),
  });

  //! Handle poiter is in arrow area
  const [hoveringArror, setHoveringArrow] = useState(false);
  const handleHoveringArrow = () => {
    setHoveringArrow(true);
  };

  const handleUnhoveringArrow = () => {
    setHoveringArrow(false);
  };

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    dismiss,
  ]);
  return (
    <div className="">
      <Element
        ref={refs.setReference}
        {...getReferenceProps()}
        className={classNames(className, {
          "text-primaryColor dark:text-primaryColor": hoveringArror,
        })}
      >
        {children}
      </Element>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              width: "max-content",
              zIndex: 100,
              transformOrigin: `${middlewareData.arrow?.x}px top`,
            }}
            {...getFloatingProps()}
            initial={{ opacity: 0, y: "-5%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-5%" }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute w-full bg-transparent"
              style={{
                height: offsetValue,
                transform: `translateY(-${offsetValue}px)`,
              }}
            ></div>
            <div className={classNames("-translate-y-1")}>{renderPopover}</div>
            <FloatingArrow
              onMouseEnter={handleHoveringArrow}
              onMouseLeave={handleUnhoveringArrow}
              ref={arrowRef}
              context={context}
              width={30}
              height={10}
              className={classNames("fill-[#d9d9e0]")}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
