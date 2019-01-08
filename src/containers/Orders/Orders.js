import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  componentDidMount() {
    axios
      .get('/orders.json')
      .then(res => {
        const orders = [];
        for (let orderId in res.data) {
          orders.push({
            ...res.data[orderId],
            orderId
          });
        }
        this.setState({
          loading: false,
          orders
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  }
  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.orderId}
            ingredients={order.ingredients}
            price={(+order.price).toFixed(2)}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
