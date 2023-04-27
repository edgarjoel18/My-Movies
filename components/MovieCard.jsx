import {
  Flex,
  Box,
  Image,
  Badge,
  useColorModeValue,
  chakra,
  Tooltip,
  Checkbox,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const data = {
  isNew: true,
  imageURL:
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80",
  name: "Wayfarer Classic",
  price: 4.5,
  rating: 4.2,
  numReviews: 34,
};

function MovieCard({ movieData, onBookmark, onRemove, onWatch, seenMovies }) {
  const renderButton = onRemove ? (
    <CloseIcon
      w={6}
      h={6}
      _hover={{ cursor: "pointer" }}
      onClick={() => onRemove(movieData)}
    />
  ) : null;
  let temp = JSON.parse(seenMovies);
  let index = temp.findIndex((m) => m.imdbID === movieData.imdbID);

  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        h="100%"
      >
        <Image
          src={movieData.Poster}
          alt={`Picture of ${movieData.Title}`}
          roundedTop="lg"
          w="100%"
          onClick={onBookmark}
          _hover={{ cursor: "pointer" }}
        />
        <Box p="6">
          <Box d="flex" alignItems="baseline">
            {data.isNew && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="blue">
                {movieData.Year}
              </Badge>
            )}
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              _hover={{ cursor: "pointer" }}
              onClick={onBookmark}
            >
              {movieData.Title}
            </Box>
            <Tooltip>
              <chakra.a
                href={"#"}
                display={"flex"}
                onClick={(event) => onWatch(movieData.imdbID, event)}
              >
                <Checkbox defaultChecked={index >= 0}>Watched</Checkbox>
              </chakra.a>
            </Tooltip>
          </Flex>
        </Box>
        {renderButton}
      </Box>
    </Flex>
  );
}

export default MovieCard;
