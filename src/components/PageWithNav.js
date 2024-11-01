import React from "react";
import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";
import Nav from "./Nav";

const PageWithNav = ({ homePage, bag, buildBundle }) => {

  return (
    <Box>
      <Nav />
    </Box>
  );
};

PageWithNav.propTypes = {
  homePage: PropTypes.bool,
  bag: PropTypes.bool,
  buildBundle: PropTypes.bool,
};

export default PageWithNav;
