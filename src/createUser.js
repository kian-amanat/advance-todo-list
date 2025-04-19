import React, { useRef, useState } from "react";
import { getfetchData } from "./api.js";
const jwtTokenFront =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksInVzZXJuYW1lIjoia2FyaW0iLCJpYXQiOjE3MjQxOTUyMjR9.LDjdmfhVEWa3OXjfxf8wtIrYspnw4ssI9gO6GBEBTg4";

export async function createdUserData(firstName, lastName) {
  let first = firstName.current.value;
  let last = lastName.current.value;

  if (first && last) {
    let firstNameString = [first].join(", ");
    let lastNameString = [last].join(", ");

    const sendString = `{
   "userName": "${firstNameString}" 
   , "password": "${lastNameString}"
   }`;

    const data = {
      userName: [first],
      password: [last],
    };

    try {
      const response = await fetch("http://localhost:3001/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtTokenFront}`,
        },
        body: sendString,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log(responseData);
      if (!responseData) {
        console.log(false);
      }

      firstName.current.value = "";
      lastName.current.value = "";
      return true;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  }
}

export async function logInUserData(firstName, lastName) {
  let first = firstName.current.value;
  let last = lastName.current.value;

  if (first && last) {
    let firstNameString = [first].join(", ");
    let lastNameString = [last].join(", ");

    const sendString = `{
      "userName": "${firstNameString}",
      "password": "${lastNameString}"
    }`;

    try {
      localStorage.removeItem("jwt");
      const jwtToken = localStorage.getItem("jwt");

      const response = await fetch("http://localhost:3001/signIn", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Use jwtToken here
          "Content-Type": "application/json",
        },
        body: sendString,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      if (!responseData) {
        console.log(false);
      }
      console.log(responseData);
      const newJwtToken = responseData.jwt;
      localStorage.setItem("jwt", newJwtToken);
      console.log("Stored JWT:", localStorage.getItem("jwt"));
      firstName.current.value = "";
      lastName.current.value = "";
      return true;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  }
  return false;
}
