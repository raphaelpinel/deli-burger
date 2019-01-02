import React from 'react';
import classes from './BuildControl.module.css';

const buildControl = props => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>
      {props.label} {props.price}€
    </div>
    <button
      className={classes.Less}
      onClick={props.removed}
      disabled={props.lessButtonDisabled}
    >
      Less
    </button>
    <button
      className={classes.More}
      onClick={props.added}
      disabled={props.moreButtonDisabled}
    >
      More
    </button>
  </div>
);

export default buildControl;
