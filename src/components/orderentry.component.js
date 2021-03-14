import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class OrderEntry extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        //TODO: get dish from backend
    }

    render() {
        return(
            <div className="row">
                <input className="form-control" type="text" value={this.props.value.dishName}/>
                <input className="form-control" type="number" value={this.props.value.quantity}/>
                <input className="form-control" step="0.01" type="number" value={this.props.value.price}/>
            </div>
        )
    }

}