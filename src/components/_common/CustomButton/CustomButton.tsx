import { Button, ButtonProps } from "@mui/material";
import classNames from "classnames";

type CustomButtonProps = ButtonProps;

export default function CustomButton({
  children,
  className,
  ...rest
}: CustomButtonProps) {
  return (
    <Button
      className={classNames(
        "!normal-case  !text-base  !text-darkText !font-normal",
        className
      )}
      {...rest}
    >
      {children}
    </Button>
  );
}
