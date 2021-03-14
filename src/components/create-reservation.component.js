import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OrderEntry from './orderentry.component';
import UserEntry from "./orderentry.component"

export default class CreateReservation extends Component {
    constructor(props) {
        super(props)

        this.onChangeInput = this.onChangeInput.bind(this)
        this.handleChangeDish = this.handleChangeDish.bind(this)
        this.handleDeleteDish = this.handleDeleteDish.bind(this)
        this.addDish = this.addDish.bind(this)

        this.state = {
            name: '',
            city: '',
            zipCode: '',
            street: '',
            number: '',
            appartment: '',
            remarks: '',
            orders: [
            ],
            payment: 'overschrijving',
            reservationType: '',
            dishes: []
        }
    }

    componentDidMount(){
        fetch('http://localhost:5000/dishes')
            .then(response => response.json())
            .then(data => this.setState({
                dishes: data
            }))
    }

    componentDidUpdate(){
        if(this.state.dishes.length > 0 && this.state.orders.length > 0 && this.state.orders[this.state.orders.length-1].dishName == undefined){
            const { orders } = this.state
            let newOrders = orders.slice()
            let newDish = newOrders[orders.length-1]
            newDish["dishName"] = this.state.dishes[0].dishName;
            newDish["price"] = this.state.dishes[0].price;
            newDish["quantity"] = 1
            this.setState({
                orders: newOrders,
            })
        }
    }

    onChangeInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleChangeDish(e, index) {
        const { orders } = this.state
        let newOrders = orders.slice()
        let newDish = newOrders[index]
        newDish[e.target.name] = e.target.value;
        newDish["price"] = this.state.dishes.filter(dish => dish.dishName === newDish.dishName)[0].price

        this.setState({
            orders: newOrders,
        })
    }

    handleDeleteDish(e, index) {
        e.preventDefault()
        const { orders } = this.state
        let newOrders = orders.slice()
        let newDish = newOrders.splice(index, 1)

        this.setState({
            orders: newOrders,
        })
    }

    onSubmit(e) {
        e.preventDefault()

        const reservation = {
            name: this.state.name,
            adress: {
                country: this.state.country,
                city: this.state.city,
                street: this.state.street,
                number: this.state.number,
                appartment: this.state.appartment,
                remarks: this.state.remarks
            },
            order: this.state.order,
            payment: this.state.payment,
            reservationTytpe: this.state.reservationType
        }

        console.log(reservation)

        window.location = '/'
    }

    addDish(e){
        e.preventDefault()
        this.setState({
            orders: [...this.state.orders, {}]
        })
    }

    render() {
        const { orders } = this.state;
        return (
            <div>
                <h3>Nieuwe inschrijving</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group col-xl-12">
                        <label>naam: </label>
                        <input type="text"
                            value={this.state.name}
                            onChange={this.onChangeInput}
                            className="form-control col-xl-4"
                            placeholder="Naam"
                            name="name"
                            required
                        />
                    </div>
                    <h4>Adres:</h4>
                    <div className="form-group">
                        <div className="row col-xl-10">
                            <div className="col col-xl-4">
                                <label className>postcode: </label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Postcode"
                                    name="zipCode"
                                    value={this.state.zipCode}
                                    onChange={this.onChangeInput}
                                />
                            </div>
                            <div className="col col-xl-8">
                                <label>gemeente: </label>
                                <input type="text"
                                    className="form-control"
                                    onChange={this.onChangeInput}
                                    name="city"
                                    value={this.state.city}
                                    placeholder="Gemeente"
                                />
                            </div>
                        </div>
                        <div className="row col-xl-10">
                            <div className="col col-xl-8">
                                <label>straat: </label>
                                <input type="text"
                                    className="form-control"
                                    name="street"
                                    onChange={this.onChangeInput}
                                    value={this.state.street}
                                    placeholder="Straat"
                                />
                            </div>
                            <div className="col col-xl-2">
                                <label>nummer: </label>
                                <input type="text"
                                    className="form-control"
                                    name="number"
                                    onChange={this.onChangeInput}
                                    value={this.state.number}
                                    placeholder="Nummer"
                                />
                            </div>
                            <div className="col col-xl-2">
                                <label>bus: </label>
                                <input type="text"
                                    className="form-control"
                                    name="appartment"
                                    onChange={this.onChangeInput}
                                    value={this.state.appartment}
                                    placeholder="Bus"
                                />
                            </div>
                        </div>
                        <div className="row col-xl-10">
                            <div className="col">
                                <label>opmerkingen: </label>
                                <textarea className="form-control"
                                    name="remarks"
                                    onChange={this.onChangeInput}
                                    value={this.state.remarks}
                                    placeholder="Remarks"
                                    rows="3"
                                />
                            </div>
                        </div>
                    </div>
                    <button onClick={this.addDish}>add</button>
                    {orders && orders.length > 0 && (
                        <div className="form-group">
                            <h4>Bestelling: </h4>
                            {orders.map((orderEntry, i) => {
                                return (<OrderEntry handleChangeDish={(e) => this.handleChangeDish(e, i)} entry={orderEntry} dishes={this.state.dishes} handleDeleteDish={(e) => this.handleDeleteDish(e, i)}/>)
                            })}
                        </div>
                    )}
                    <div className="form-group">
                        <h4>Betaling:</h4>
                        <div className="row">
                            <div className="col col-xl-6">
                                <label>methode: </label>
                                <select className="form-control"
                                    value={this.state.payment}
                                    name="payment"
                                    onChange={this.onChangeInput}>
                                    <option key="BANK" value="overschrijving">overschrijving</option>
                                    <option key="SALLY" value="cash: Sally">cash: Sally</option>
                                    <option key="JEANINE" value="cash: Jeanine">cash: Jeanine</option>
                                    <option key="ERIC" value="cash: Eric">cash: Eric</option>
                                </select>
                            </div>
                            <div className="col col-xl-6">
                                <label>type: </label>
                                <select className="form-control"
                                    value={this.state.reservationType}
                                    name="reservationType"
                                    onChange={this.onChangeInput}>
                                    <option key="TAKE-OUT" value="afhalen">afhalen</option>
                                    <option key="DELIVERY" value="bezorgen">bezorgen</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}