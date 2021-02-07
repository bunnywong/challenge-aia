import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import GlobalStyle from 'src/components/_settings/GlobalStyle'

const Layout = ({ children }) => (
  <>
    <Helmet>
      <title>challenge Hero</title>
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    </Helmet>
    <GlobalStyle />
    <>{children}</>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
