import React from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from 'react-router-dom';
import PropTypes from "prop-types";
import Nav from "./Nav";
import HomePage from "./HomePage";

const PageWithNav = ({ homePage, bag, buildBundle }) => {
  return (
    <Box>
      <Nav />
      {homePage ? <HomePage /> : <Outlet />}
    </Box>
  );
};

PageWithNav.propTypes = {
  homePage: PropTypes.bool,
  bag: PropTypes.bool,
  buildBundle: PropTypes.bool,
};

export default PageWithNav;
