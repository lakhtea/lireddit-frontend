import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { IconButton, Box, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [_, deletePost] = useDeletePostMutation();
  const [{ data: meData }] = useMeQuery();

  return (
    <>
      {meData?.me?.id === creatorId && (
        <Box ml="auto">
          <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
            <IconButton
              as={Link}
              mr={4}
              aria-label="Edit post"
              icon={<EditIcon />}
              onClick={() => {}}
            />
          </NextLink>
          <IconButton
            aria-label="Delete post"
            icon={<DeleteIcon />}
            onClick={() => {
              deletePost({ id });
            }}
          />
        </Box>
      )}
    </>
  );
};

export default EditDeletePostButtons;
