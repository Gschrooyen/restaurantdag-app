import React from 'react';
import { Link } from 'react-router-dom';

const OrderEntry = ({entry, handleChangeDish}) => {
        return(
            <div className="row col-xl-10">
                <input onChange={handleChangeDish} className="form-control" name="dishName" type="text" value={entry.dishName}/>
                <input onChange={handleChangeDish} className="form-control" name="quantity" type="number" value={entry.quantity}/>
                <input onChange={handleChangeDish} className="form-control" name="price" step="0.01" type="number" value={entry.price}/>
            </div>
        )
}

export default OrderEntry;