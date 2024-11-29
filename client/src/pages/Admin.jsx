import React, { createContext, useContext } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { StratContainer } from "../components/Index.js";
import styled from "styled-components";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/strats");

    return { data };
  } catch (error) {
    toast.error("Something went wrong getting strats");
    return 1;
  }
};
const AllStratsContext = createContext();

const Admin = () => {
  const { data } = useLoaderData();
  const stratData = async () => {
    try {
      const { data } = await customFetch.get("/users/current-user");

      const status = data.user.role;
      if (status != "admin") {
        toast.error("yes...");
        return redirect("/");
      }
      return { data };
    } catch (error) {
      toast.error("Nah uh..");
      return redirect("/");
    }
  };

  stratData();

  return (
    <Wrapper>
      <AllStratsContext.Provider value={{ data }}>
        <StratContainer />
      </AllStratsContext.Provider>
    </Wrapper>
  );
};

export const useAllStratsContext = () => (useContext(AllStratsContext))
const Wrapper = styled.section `
`

export default Admin;
