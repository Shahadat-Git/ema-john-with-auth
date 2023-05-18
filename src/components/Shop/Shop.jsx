import React, { useEffect, useState } from 'react';
import './Shop.css';
import Products from '../Products/Products';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Orders from '../Orders/Orders';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        // console.log("products", products)
        const storedCart = getShoppingCart();
        const savedCart = [];
        // console.log(storedCart)
        // step 1: get id
        for (const id in storedCart) {
            // get the product using id
            const addedPruduct = products.find(product => product.id == id)
            if (addedPruduct) {
                // step 3: get quantity of the product
                const quantity = storedCart[id]
                addedPruduct.quantity = quantity;
                // step 4: add the addedproduct to the save cart
                savedCart.push(addedPruduct)
                // console.log('added product', addedPruduct)
            }
        }
        // step 5: set the cart
        setCart(savedCart)

    }, [products])

    const handleAddToCart = (product) => {
        // console.log(product)
        // const newCart = [...cart, product]

        let newCart = [];
        // if product doesn't exist in the cart, the set quantity = 1
        // if exist up quantiry by 1 
        const exists = cart.find(pd => pd.id === product.id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists]

        }


        setCart(newCart)
        addToDb(product.id)
    }


    const handleClearFromCart = () =>{
        // console.log('hi')
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                <Products products={products} handleAddToCart={handleAddToCart}></Products>
            </div>
            <div className="cart-container">
                <Cart 
                cart={cart} 
                handleClearFromCart={handleClearFromCart}
                to='/orders'
                ><div>Review Order <FontAwesomeIcon icon={faCircleArrowRight}></FontAwesomeIcon></div>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;