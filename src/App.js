import React from 'react';
import Order from "./Order";

const getAllCategories = () => {
  return new Promise(resolve =>
      resolve(
          {
            data: [
              {
                id: 1,
                name: 'Category a'
              },
              {
                id: 2,
                name: 'Category b'
              }
            ]
          }
      )
  )
}

const getAllProductsByCategory = () => {
  return new Promise(resolve =>
      resolve(
          {
            data: [
              {
                id: 1,
                name: 'Product a',
                price: 100
              },
              {
                id: 2,
                name: 'Product b',
                price: 250
              },
              {
                id: 3,
                name: 'Product c',
                price: 300
              },
            ]
          }
      )
  )
}

const saveOrder = () => {
  return new Promise(resolve =>
      resolve(
          {
            data: {
              isValid: true
            }
          }
      )
  )
}

function App() {
  return (
    <div>
      <Order
          getAllCategories={getAllCategories}
          getAllProductsByCategory={getAllProductsByCategory}
          saveOrder={saveOrder}
      />
    </div>
  );
}

export default App;
