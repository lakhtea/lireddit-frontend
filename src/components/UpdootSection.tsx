import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [_, vote] = useVoteMutation();
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");

  return (
    <Flex direction="column" align="center" justify="center" mr={4}>
      <IconButton
        icon={<ChevronUpIcon />}
        aria-label="updoot post"
        isLoading={loadingState === "updoot-loading"}
        onClick={async () => {
          setLoadingState("updoot-loading");
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState("not-loading");
        }}
        bg={post.voteStatus === 1 ? "teal" : undefined}
        fontSize={24}
      />
      {post.points}
      <IconButton
        icon={<ChevronDownIcon />}
        aria-label="downdoot post"
        isLoading={loadingState === "downdoot-loading"}
        onClick={async () => {
          setLoadingState("downdoot-loading");
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState("not-loading");
        }}
        bg={post.voteStatus === -1 ? "tomato" : undefined}
        fontSize={24}
      />
    </Flex>
  );
};

export default UpdootSection;
