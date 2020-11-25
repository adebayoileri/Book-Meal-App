import React from "react";
import { Center, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Center pt="5">
      <Spinner style={{ color: "#FF8908" }} size="xl" />
    </Center>
  );
};
export default Loading;
