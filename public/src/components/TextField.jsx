import { WarningIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { faCircleExclamation, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useField } from "formik";
import React from "react";

const TextField = ({ label, id, leftElement, rightElement, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.error && meta.touched}>
      <FormLabel
        pt={3}
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
        <FontAwesomeIcon size="lg" icon={faCircleExclamation} />
        <Text fontWeight={"bold"} ml={2}>
          {meta.error}
        </Text>
      </FormErrorMessage>
    </FormControl>
  );
};

export default TextField;
