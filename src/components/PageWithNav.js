import React from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from 'react-router-dom';
import PropTypes from "prop-types";
import Nav from "./Nav";
import HomePage from "./HomePage";
import BuildBundle from "./BuildBundle";
import Bag from "./Bag";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SkinCareQuiz from "./Quiz"

const PageWithNav = ({ homePage, bag, buildBundle, signIn, signUp, quiz }) => {
  return (
    <Box fontFamily="CaviarDreams">
      <Nav />
      {homePage ? <HomePage /> : buildBundle ? <BuildBundle /> : bag ? <Bag /> : signIn ? <SignIn /> : signUp ? <SignUp /> : quiz ? <SkinCareQuiz /> : <Outlet />}
    </Box>
  );
};

PageWithNav.propTypes = {
  homePage: PropTypes.bool,
  bag: PropTypes.bool,
  buildBundle: PropTypes.bool,
  signIn: PropTypes.bool,
  signUp: PropTypes.bool,
  quiz: PropTypes.bool,
};

export default PageWithNav;
