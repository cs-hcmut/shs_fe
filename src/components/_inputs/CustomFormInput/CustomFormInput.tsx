"use client";

import type { Theme, SxProps } from "@mui/material";
import type { Path, Control, FieldValues } from "react-hook-form";

import React from "react";
import classNames from "classnames";
import { Controller } from "react-hook-form";

import { MenuItem, TextField, Typography } from "@mui/material";

export interface InputOptionItem {
  name: string;
  value: string | number;
}

export interface CustomInputField<FormType extends FieldValues> {
  name: Path<FormType>;
  title: string;
  placeHolder?: string;
  svgData?: React.ReactNode;
  type?: React.HTMLInputTypeAttribute | "array" | "options" | "textArea";
  errorMsg?: string;
  readonly?: boolean;
  required?: boolean;
  valueOptions?: InputOptionItem[];
}

interface StyleProps {
  inputContainerClassName?: string;
  wrapperClassName?: string;
  titleClassName?: string;
  inputSx?: SxProps<Theme>;
}

interface CustomFormInputProps<FormType extends FieldValues>
  extends StyleProps {
  inputField: CustomInputField<FormType>;
  control: Control<FormType>;
  onChange?: (e: string) => void;
}

export default function CustomFormInput<FormType extends FieldValues>({
  inputField,
  control,
  titleClassName,
  inputSx,
  wrapperClassName,
  onChange,
}: CustomFormInputProps<FormType>) {
  const options = inputField.valueOptions || [];

  return (
    // <div className="w-full flex-col justify-start items-start gap-2 flex">
    //   <div className="gap-0.5 flex">
    //     <div className="text-[#414651] font-semibold">{inputField.title}</div>
    //     {inputField.required && (
    //       <div className="text-[#d92c20] font-semibold font-['Inter'] leading-tight">*</div>
    //     )}
    //   </div>
    // </div>
    <Controller
      name={inputField.name}
      control={control}
      render={({ field, fieldState }) => {
        if (inputField.type === "options") {
          return (
            <div
              className={classNames(
                "w-full flex-col justify-start items-start gap-2 flex",
                wrapperClassName
              )}
            >
              <div className="gap-0.5 flex">
                <div
                  className={classNames(
                    "text-[#414651] font-semibold",
                    titleClassName
                  )}
                >
                  {inputField.title}
                </div>
                {inputField.required && (
                  <div className="text-[#d92c20] font-semibold font-['Inter'] leading-tight">
                    *
                  </div>
                )}
              </div>
              <TextField
                id={`select-${inputField.name}`}
                select
                fullWidth
                value={field.value !== undefined ? field.value : ""}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  if (onChange) {
                    onChange(e.target.value);
                  }
                }}
                defaultValue={options[0].value}
                sx={{
                  ...inputSx,
                  "& .MuiInputBase-input": {
                    padding: "8px",
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          );
        }
        return (
          <div
            className={classNames(
              "w-full flex-col justify-start items-start gap-2 flex",
              wrapperClassName
            )}
          >
            <div className="gap-0.5 flex">
              <div
                className={classNames(
                  "text-[#414651] font-semibold",
                  titleClassName
                )}
              >
                {inputField.title}
              </div>
              {inputField.required && (
                <div className="text-[#d92c20] font-semibold font-['Inter'] leading-tight">
                  *
                </div>
              )}
            </div>
            <TextField
              required
              {...field}
              error={!!fieldState.error?.message}
              placeholder={inputField.placeHolder}
              multiline={inputField.type === "textArea"}
              rows={1}
              sx={{
                ...inputSx,
                "& .MuiInputBase-input": {
                  padding: "8px",
                },
              }}
            />
            {fieldState?.error?.message && (
              <Typography color="red" className="!text-sm">
                {fieldState.error.message}
              </Typography>
            )}
          </div>
        );
      }}
    />
  );
}
