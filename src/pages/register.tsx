import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Button,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useMutation } from "urql";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";

interface registerProps {}

const REGISTER_MUT = `mutation Register($username: String!, $password: String!){
    register(options: {username: $username, password: $password}) {
      errors {
        field
        message
      }
      user {
        id
        username
      }
    }
  }`;

const Register: React.FC<registerProps> = ({}) => {
  const [_, register] = useMutation(REGISTER_MUT);

  return (
    <Wrapper>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values) => {
          const response = await register(values);
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
