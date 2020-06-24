import * as React from 'react'

type ProductType = {
  product: any,
  onSelected: any,
}
export const Product = (
  {
    product,
    onSelected
  }: ProductType
) => (
  <div onClick={() => onSelected(product)}>
    <p>Nombre: {product.name}</p>
    <p>Precio: {product.price}</p>
  </div>
)

type OrderType = {
  getAllCategories: any,
  getAllProductsByCategory: any,
  saveOrder: any,
}
const Order = (
  {
    getAllCategories,
    getAllProductsByCategory,
    saveOrder
  }: OrderType
) => {

  const { useEffect, useState } = React
  const [ categories, setCategories ] = useState([])
  const [ products, setProducts ] = useState([])
  const [ cart, setProductsToCart ] = useState([] as any)
  const [ message, setMessage ] = useState('')

  useEffect(() => {
    getAllCategories()
      .then((res: any) =>
        setCategories(res.data)
      )
  }, [])

  async function handleCategorySelected(target: any) {
    const res = await getAllProductsByCategory(target.value)
    setProducts(res.data)
  }

  /**
   * Tal vez antes de salvar los productos en el backend
   * debemos de asegurarnos que seleccione por lo menos un producto
   *
   * Esto también se podría probar en otro caso de prueba
   */
  async function handlePayment() {
    const res = await saveOrder(cart)
    setMessage(res.data.isValid ?
      'El pedido se ha completado correctamente' :
      'Ha ocurrido un problema con tu pedido, prueba más tarde'
    )
  }

  return(
    <div>
      <h2>Pedido</h2>
      { message && <div id='feedback'>{message}</div> }
      <select
        name=""
        id="category-type"
        onChange={({ target }) =>
          handleCategorySelected(target)
        }
      >
        {
          categories.map((category: any) =>
            <option
              value={category.id}
              key={category.id}
            >
              {category.name}
            </option>
          )
        }
      </select>
      <div>
        {
          products.map((product: any) =>
            <Product
              key={product.id}
              product={product}
              onSelected={(product: any) => {
                setProductsToCart([ ...cart, { ...product } ])
              }}
            />
          )
        }
      </div>
      <button
        id={'pay-button'}
        onClick={handlePayment}
      >
        Pagar
      </button>
      <div>
        <p>Productos seleccionados</p>
        {
          cart.map((product: any) =>
            <div key={product.id}>
              <p>Nombre: { product.name }</p>
              <p>Precio: { product.price }</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Order
