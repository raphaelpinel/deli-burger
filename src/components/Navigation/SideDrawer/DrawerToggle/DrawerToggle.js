import React from 'react';
import classes from './DrawerToggle.module.css';

const drawerToggle = props => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div className={classes.Bar} />
    <div className={classes.Bar} />
    <div className={classes.Bar} />
  </div>
);

export default drawerToggle;
