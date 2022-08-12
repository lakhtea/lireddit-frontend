import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
};

const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={form.errors.name && form.touched.name}>
      <FormLabel>First name</FormLabel>
      <Input {...field} id={field.name} placeholder="name" />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;
