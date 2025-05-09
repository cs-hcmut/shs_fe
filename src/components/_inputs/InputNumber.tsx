import { InputHTMLAttributes, forwardRef, useState } from "react";

export interface InputNumberProps
  extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  inputClassName?: string;
  errorClassName?: string;
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  function InputNumberInner(
    {
      errorMessage,
      className,
      inputClassName = "w-full rounded-sm border border-gray-300 p-3 outline-none outline focus:border-gray-500 focus:shadow-sm",
      errorClassName = "mt-1 min-h-[1.25rem] text-sm text-red-600",
      onChange,
      value = "",
      ...rest
    },
    ref
  ) {
    const [localValue, setLocalValue] = useState<string>(value as string);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (/^\d+$/.test(value) || value === "") {
        if (onChange) onChange(event);
        setLocalValue(value);
      }
    };

    return (
      <div className={className}>
        <input
          className={inputClassName}
          onChange={handleChange}
          value={value || localValue}
          {...rest}
          ref={ref}
        />
        <div className={errorClassName}>{errorMessage}</div>
      </div>
    );
  }
);

export default InputNumber;
