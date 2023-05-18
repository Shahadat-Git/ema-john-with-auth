import React from 'react';
import './ReviewItems.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ReviewItem = ({ product,handleRemoveFromCart }) => {
    const { id, img, price, quantity, name } = product;
    return (
        <div className='review-item'>
            <img src={img} alt="" />
            <div className='review-item-info'>
                <div>
                    <h5>{name}</h5>
                    <p>Price: <span>{price}</span></p>
                    <p>Quantity: <span>{quantity}</span></p>
                </div>
                <div>
                    <button onClick={()=>handleRemoveFromCart(id)} className='btn-delete'><FontAwesomeIcon className='delete-icon' icon={faTrashCan}></FontAwesomeIcon></button>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;