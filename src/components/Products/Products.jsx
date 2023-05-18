import React, { useEffect, useState } from 'react';
import './Products.css'
import Product from '../Product/Product';

const Products = ({handleAddToCart, products}) => {
    return (
        <div className='products'>
            {
                products.map(product => <Product handleAddToCart={handleAddToCart} product={product} key={product.id}></Product>)
            }
        </div>
    );
};

export default Products;