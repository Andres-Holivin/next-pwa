"use client"
import { Box } from "@chakra-ui/react";

import React, { cache, use } from "react";

const getUsers = cache(() =>
  fetch("http://localhost:3000/api/patient").then((res) => res.json())
);

export default function Home() {
  let users = use(getUsers());
  console.log(users)
  return (
    <Box bg={"red"}>
      {users[0].no_registration.toString()}
    </Box>
  )
}
