import React, { Component } from 'react';
import { render } from 'react-dom';

import './styles.scss';

import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

const initialState = {
  count: 0,
};

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET'

const reducer = (state = initialState, action) => {
  
  if (action.type === INCREMENT) {
    return {
      count: state.count + 1
    }
  }
 
  // decrease the value
  if(action.type === DECREMENT){
    return {
      count: state.count - 1
    }
  }

  if(action.type === RESET){
    return{
      count: 0
    }
  }
  return state;
};

const increase = () =>{
  return({
    type: INCREMENT
  })
}


const decrease = () =>{
  return({
    type: DECREMENT
  })
}

const reset = () =>{
  return({
    type: RESET
  })
}

const store = createStore(reducer);

class Counter extends Component {
  render() {
    return (
      <main className="Counter">
        <p className="count">{this.props.count}</p>
        <section className="controls">
          <button onClick={this.props.increment}>Increment</button>
          <button  onClick={this.props.decrement}>Decrement</button>
          <button  onClick={this.props.reset}> Reset</button>
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) =>{
  const {count} = state;
  return {count};
}

const mapDispatchToProps = (dispatch) => {
  // return an object
  return {
    // call the function 
    // it will throw an error --> as it will return type should be function
    // action return type should be object and not functions
    increment: () => dispatch(increase()),
    decrement: () => dispatch(decrease()),
    reset: () => dispatch(reset())
  }
}

const Container = connect(mapStateToProps,mapDispatchToProps)(Counter)

render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('root'),
);
