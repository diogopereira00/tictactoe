import { Avatar, Badge, Box, Stack, useColorModeValue } from "@chakra-ui/react";
import React from "react";

function User(props) {
  return (
    <Box bg={useColorModeValue("#F5F4F5", "#303030a6")} borderRadius={5} pl={0.5} pr={0.5} pt={2}>
      <Avatar
        m={2}
        size={"xl"}
        src={props.player1Avatar}
        alt={"Author"}
        css={
          props.open === true
            ? {
                border: "3px solid #048918",
              }
            : {
                border: "3px solid #0a72e7",
              }
        }
      />
      <Stack spacing={0} align={"center"} mb={2}>
        <Badge fontSize={13} variant="subtle" mt={3} mb={3}>
          {props.player1Username}
        </Badge>
      </Stack>
    </Box>
  );
}

export default User;
