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
import SkinCareQuiz from "./Quiz";
import ExploreBundles from "./ExploreBundles";
import Favorites from "./Favorites"

const PageWithNav = ({ homePage, bag, buildBundle, signIn, signUp, quiz, exploreBundles, favorites }) => {
  return (
    <Box fontFamily="CaviarDreams">
      <Nav />
      {homePage ? <HomePage /> : buildBundle ? <BuildBundle /> : bag ? <Bag /> : signIn ? <SignIn /> : signUp ? <SignUp /> : quiz ? <SkinCareQuiz /> : exploreBundles ? <ExploreBundles /> : favorites ? <Favorites /> : <Outlet />}
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
  exploreBundles: PropTypes.bool,
  favorites: PropTypes.bool
};

export default PageWithNav;
