import React, { Fragment } from 'react';

import classes from './Layout.css';
import ToolBar from '../Navigation/Toolbar/Toolbar'

const layout = props => (
  <Fragment>
    <ToolBar />
    <main className={classes.Content}>{props.children}</main>
  </Fragment>
);

export default layout;
