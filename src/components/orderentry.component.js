import React from 'react';
import { Link } from 'react-router-dom';

const OrderEntry = ({entry, handleChangeDish}) => {
        return(
            <div className="row">
                <input onChange={handleChangeDish} className="form-control" type="text" value={entry.dishName}/>
                <input onChange={handleChangeDish} className="form-control" type="number" value={entry.quantity}/>
                <input onChange={handleChangeDish} className="form-control" step="0.01" type="number" value={entry.price}/>
            </div>
        )
}

export default OrderEntry;