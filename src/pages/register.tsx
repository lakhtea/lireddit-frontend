import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Button,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [_, register] = useRegisterMutation();

  return (
    <Wrapper>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          if (response.data?.register.errors) {
            setErrors({
              username: "I'm an error",
            });
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                type="password"
                label="Password"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
