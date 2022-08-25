import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useState, useEffect } from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useRouter } from "next/router";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(isServer());
  }, []);

  const [{ data, fetching }] = useMeQuery({ pause: isSSR });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let body = null;

  if (fetching) {
    body = null;
  } else if (!data?.me) {
    body = (
      <Flex>
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </Flex>
    );
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          onClick={async () => {
            await logout();
            router.reload();
          }}
          isLoading={logoutFetching}
          variant="link"
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex position="sticky" zIndex="1" top="0" bg="tan" p={4}>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};

export default NavBar;
