import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useFlexLayout } from 'react-table';

const OrderEntry = ({entry, handleChangeDish, dishes, handleDeleteDish, index}) => {

    const closeStyle= {
        fontSize: '2.8em',
        color: 'red',
        height: 'max-content'
    }
    const itemStyle= {
        display: 'flex',
        justifyContent: 'flex-end',
        alignContent: 'flex-start'
    }

    return(
        
        <div className="row col-xl-10 border border-secondary m-3" style={itemStyle}>
            <select onChange={handleChangeDish} className="form-control col-xl-11 mb-3 mt-3" name="dishName" value={entry.dishName}>
                {dishes.map(dish => {
                    return(<option key={dish.dishName + index} value={dish.dishName}>{dish.dishName}</option>)
                })}
            </select>
            <button type="button" onClick={handleDeleteDish} class="close col-1" aria-label="Close" style={closeStyle}>
                <span aria-hidden="true">&times;</span>
            </button>
            <input onChange={handleChangeDish} className="form-control col-xl-8" name="quantity" step="1" min="0" type="number" value={entry.quantity} required/>
            <div className="input-group mb-3 col-xl-4">
                <div className="input-group-prepend">
                    <span className="input-group-text">€</span>
                </div>
                <input onChange={handleChangeDish} className="form-control" name="price" step="0.01" type="number" value={entry.price} disabled/>
            </div>
        </div>
    )
}

export default OrderEntry;
