import { Button, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

function randomColor() {
  return Math.floor(Math.random() * 5);
}
const colorList = ["#E53E3E", "#38A169", "#00B5D8", "#44337A", "#ED64A6"];
export default function MyButton(props) {
  const [colorCode, setColorCode] = useState(colorList[randomColor()]);
  const router = useRouter();
  return (
    <Button
      {...props}
      px={8}
      bg={useColorModeValue("#151f21", "gray.900")}
      color={"white"}
      rounded={"md"}
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "lg",
      }}
      top={"5vh"}
      left={"5vw"}
      onClick={() => {
        setColorCode(colorList[randomColor()]);
        router.push("/");
      }}
    >
      Go back
    </Button>
  );
}
