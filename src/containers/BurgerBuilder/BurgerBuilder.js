import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};
const MAX_NUMBER_OF_INGREDIENTS = 8;

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 3.99,
    purchasable: false,
    purchasing: false,
    maximumNumberOfIngredientsReached: false
  };

  checkForNumberofIngredients(ingredients) {}
  updatePurchaseState(ingredients) {
    const numberOfIngredientsAdded = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: numberOfIngredientsAdded > 0 });
    if (numberOfIngredientsAdded >= MAX_NUMBER_OF_INGREDIENTS) {
      alert('You can only add 8 ingredients!');
    }
    this.setState({
      maximumNumberOfIngredientsReached:
        numberOfIngredientsAdded >= MAX_NUMBER_OF_INGREDIENTS
    });
  }
  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  };
  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    alert("let's continue!");
  };

  render() {
    const disabledLessButtonInfo = {
      ...this.state.ingredients
    };
    console.log(this.state.maximumNumberOfIngredientsReached);

    for (let key in disabledLessButtonInfo) {
      disabledLessButtonInfo[key] = disabledLessButtonInfo[key] <= 0;
    }

    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice.toFixed(2)}
            cancel={this.purchaseCancelHandler}
            continue={this.purchaseContinueHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          lessButtonDisabled={disabledLessButtonInfo}
          moreButtonDisabled={this.state.maximumNumberOfIngredientsReached}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice.toFixed(2)}
          prices={INGREDIENT_PRICES}
        />
      </>
    );
  }
}

export default BurgerBuilder;
