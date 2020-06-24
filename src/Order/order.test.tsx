import * as React from 'react'
import sinon from 'sinon'
import { mount } from 'enzyme'
import Order, { Product } from "./index";

describe('Order', function () {

  it('make a purchase successfully', async function () {

    const api = {
      getAllCategories: () => {},
      getAllProductsByCategory: () => {},
      saveOrder: () => {},
    }

    sinon.stub(
      api,
      'getAllCategories'
    ).resolves(
      {
        data: [
          {
            id: 1,
            name: 'Categoría a'
          }
        ]
      }
    )

    sinon.stub(
      api,
      'getAllProductsByCategory'
    ).resolves(
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

    const orderSpy = sinon.stub(
      api,
      'saveOrder'
    ).resolves({
      data: {
        isValid: true
      }
    })

    const wrapper = await mount(
      <Order
        getAllCategories={api.getAllCategories}
        getAllProductsByCategory={api.getAllProductsByCategory}
        saveOrder={api.saveOrder}
      />
    )

    wrapper.update()

    // Seleccionamos la única categoria
    await wrapper
      .find('#category-type')
      .first()
      .simulate('change')

    wrapper.update()

    // Agregamos dos productos al carrito
    await wrapper
      .find(Product)
      .at(1)
      .simulate('click')

    await wrapper
      .find(Product)
      .at(2)
      .simulate('click')

    wrapper.update()

    // Realizamos el pedido
    await wrapper
      .find('#pay-button')
      .first()
      .simulate('click')

    wrapper.update()

    // Verificamos que en realidad se hayan agregados los dos productos
    expect(
      orderSpy.withArgs(
        // @ts-ignore
        [
          {
            id: 2,
            name: 'Product b',
            price: 250
          },
          {
            id: 3,
            name: 'Product c',
            price: 300
          }
        ]
      ).calledOnce
    ).toBeTruthy()

    // Verificamos que el mensaje de sea el correcto
    expect(
      wrapper
        .find('#feedback')
        .first()
        .text()
    ).toBe('El pedido se ha completado correctamente')

  });

});
