import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCard } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    useEffect(() => {
        const storCart = getStoredCard()
        const savedCart = []
        for (const id in storCart) {
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct) {
                const quantity = storCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct)
            }

        }
        setCart(savedCart)
    }, [products])
    const handleAddToCart = (product) => {
        let newCart = []
        const exists = cart.find(prod => prod.id === product.id)
        if (!exists) {
            product.quantity = 1
            newCart = [...cart, product];
        }
        else {
            const rest = cart.filter(prod => prod.id !== product.id)
            exists.quantity = exists.quantity + 1
            newCart = [...rest, exists];
        }
        setCart(newCart)
        addToDb(product.id)
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product key={product.id} product={product} handleAddToCart={handleAddToCart}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;