import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class OrderEntry extends Component {
    constructor(params){
        super(params)

        this.state = {
            dishes = []
        }
    }
    
    componentDidMount(){
        fetch('http://localhost:5000/dishes')
            .then(response => response.json())
            .then(data => this.setState({
                dishes: data
            }))
    }

    render(){
        return(
            <div className="row col-xl-10">
                <input onChange={this.params.handleChangeDish} className="form-control" name="dishName" type="text" value={this.params.entry.dishName}/>
                <input onChange={this.params.handleChangeDish} className="form-control" name="quantity" type="number" value={this.params.entry.quantity}/>
                <input onChange={this.params.handleChangeDish} className="form-control" name="price" step="0.01" type="number" value={this.params.entry.price}/>
            </div>
        )
    }
}

/*
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
*/