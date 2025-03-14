import type { TextFieldProps } from "@mui/material";

import classNames from "classnames";
import { memo, forwardRef } from "react";

import { Box, TextField, Typography } from "@mui/material";

type TextFieldTopLabelProps = TextFieldProps & {
  containerClassname?: string;
};

const TextFieldTopLabel = forwardRef<HTMLInputElement, TextFieldTopLabelProps>(
  ({ containerClassname, inputProps, required, label, ...props }, ref) => {
    return (
      <Box
        component="div"
        className={classNames("flex flex-col gap-[6px]", containerClassname)}
      >
        {label && (
          <Typography className="!text-sm !font-medium !text-secondary flex items-center">
            {label} {required && <span className="text-red-01">*</span>}
          </Typography>
        )}
        <TextField
          inputProps={{ className: "!py-[12px] !text-base", ...inputProps }}
          {...props}
          inputRef={ref}
        />
      </Box>
    );
  }
);

export default memo(TextFieldTopLabel);
