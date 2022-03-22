import React, { useCallback, useEffect, useRef } from "react";
import { StyledComponent } from "styled-components";

import { IStyleableProps } from "../../../commonTypes";
import { StyledInput } from "./styles";
import { FlexWrapper } from "../Wrappers/Wrapper";
import { InputLabel } from "../Label/Label";
import _ from "lodash";
type InputProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number;
  type?: string;
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
  isLazy?: boolean;
  // let us pass an array of input attributes, eg: min, max, pattern, ...
  additionalAttributes?: Record<string, any>;
  style?: object;
};

const handleInputWrapping = (
  Component: StyledComponent<"input", any>,
  {
    value,
    type = "text",
    label,
    placeholder,
    isDisabled,
    isLazy,
    onChange,
    additionalAttributes,
    style,
  }: InputProps
) => {
  const inputRef = useRef();

  useEffect(() => {
    if (isLazy) {
      console.log("VALUE?", value);
      // @ts-ignore
      inputRef.current.value = value;
    }
  }, [value]);

  const handleLazyChange = (evt: any) => {
    console.log("lazuy change");
    if (onChange) {
      console.log("trigger onChange props");
      onChange(evt);
    }
  };
  const debouncedOnChange = useCallback(_.debounce(handleLazyChange, 200), []);

  return (
    <FlexWrapper alignItems={"start"} style={style}>
      {label && <InputLabel>{label}</InputLabel>}
      {isLazy ? (
        <Component
          // @ts-ignore
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          disabled={isDisabled}
          onChange={debouncedOnChange}
          {...additionalAttributes}
        />
      ) : (
        <Component
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={isDisabled}
          onChange={onChange}
          {...additionalAttributes}
        />
      )}
    </FlexWrapper>
  );
};

export const Input = (props: InputProps & IStyleableProps) =>
  handleInputWrapping(StyledInput, props);
