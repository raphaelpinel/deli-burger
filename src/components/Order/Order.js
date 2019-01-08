import React from 'react';
import classes from './Order.module.css';

const order = props => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  const ingredientsList = ingredients
    .filter(ing => {
      return ing.amount !== 0;
    })
    .map(ing => (
      <span key={ing.name}>
        {ing.name} ({ing.amount})
      </span>
    ));
  return (
    <div className={classes.Order}>
      <p>Ingredients: </p>
      {ingredientsList}
      <p>
        Price: <strong>{props.price} €</strong>
      </p>
    </div>
  );
};

export default order;
