import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import cartPorductsLoader from '../../loaders/cartProductsLoader';
import { useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Order.css'
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCardAlt } from '@fortawesome/free-regular-svg-icons';

const Orders = () => {
    const savedCart = useLoaderData();
    const [cart,setCart] = useState(savedCart)
    // console.log(cart)

    const handleRemoveFromCart = (id)=>{
        // console.log(id)
        const remaining = cart.filter(product => product.id !== id);
        setCart(remaining);
        removeFromDb(id);
    }

    const handleClearFromCart = () =>{
        // console.log('hi')
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className='review-container'>
                {
                    cart.map(product => <ReviewItem
                        key={product.id}
                        product={product}
                        handleRemoveFromCart={handleRemoveFromCart}
                    ></ReviewItem>)
                }
            </div>
            <div className='cart-container'>
                <Cart 
                cart={cart} 
                handleClearFromCart={handleClearFromCart}
                to='/checkout'
                ><div>Prossed Checkout <FontAwesomeIcon icon={faCreditCardAlt}></FontAwesomeIcon></div></Cart>
            </div>
        </div>
    );
};

export default Orders;