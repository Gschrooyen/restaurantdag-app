import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const OrderEntry = ({entry, handleChangeDish, dishes, handleDeleteDish}) => {

        return(
            <div className="row col-xl-10">
                <select onChange={handleChangeDish} className="form-control" name="dishName" value={entry.dishName}>
                    {dishes.map(dish => {
                        return(<option key={dish.dishName} value={dish.dishName}>{dish.dishName}</option>)
                    })}
                </select>
                <input onChange={handleChangeDish} className="form-control" name="quantity" step="1" min="0" type="number" value={entry.quantity} required/>
                <input onChange={handleChangeDish} className="form-control" name="price" step="0.01" type="number" value={entry.price} disabled/>
                <button onClick={handleDeleteDish} className="form-control">delete</button>
            </div>
        )
}

export default OrderEntry;
