import { WarningIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

const TextField = ({ label, id, leftElement, rightElement, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.error && meta.touched}>
      <FormLabel
        onClick={() => {
          document.getElementById({ id }).focus();
        }}
      >
        {label}
      </FormLabel>

      <InputGroup size="lg">
        <InputLeftElement pointerEvents="none" children={leftElement} />
        <Input {...field} {...props}></Input>
        {rightElement !== null ? <InputRightElement children={rightElement} /> : ""}
      </InputGroup>
      <FormErrorMessage>
        <WarningIcon pt={1} pr={1} />
        {meta.error}
      </FormErrorMessage>
    </FormControl>
  );
};

export default TextField;
