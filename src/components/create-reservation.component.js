import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OrderEntry from './orderentry.component';

export default class CreateReservation extends Component {
    constructor(props) {
        super(props)

        this.onChangeInput = this.onChangeInput.bind(this)
        this.handleChangeDish = this.handleChangeDish.bind(this)
        this.handleDeleteDish = this.handleDeleteDish.bind(this)
        this.addDish = this.addDish.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            name: '',
            city: '',
            zipCode: '',
            street: '',
            number: '',
            appartment: '',
            remarks: '',
            orders: [],
            payment: 'overschrijving',
            reservationType: '',
            dishes: [],
            time:'',
            paid: false
        }
    }

    componentDidMount(){
        fetch('http://localhost:5000/dishes')
            .then(response => response.json())
            .then(data => this.setState({
                dishes: data,
                orders: [{}]
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
        if(e.target.type === "checkbox"){
            this.setState(initialState => ({
                [e.target.name]: e.target.checked
            }))
        }else{
            this.setState({
                [e.target.name]: e.target.value
            })
        }
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
        newOrders.splice(index, 1)

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
            orders: this.state.orders,
            payment: this.state.payment,
            reservationType: this.state.reservationType,
            time: this.state.time
        }

        fetch('http://localhost:5000/reservations', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(reservation)
        })

        window.location= '/'
    }

    addDish(e){
        e.preventDefault()
        this.setState({
            orders: [...this.state.orders, {}]
        })
    }

    render() {
        const { orders } = this.state;
        const checkStyle = { 
            transform: 'scale(1.7)',
            marginTop: '2.6rem',
            marginLeft: '1.8rem'
        }
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
                    <button className="btn btn-success" onClick={this.addDish}>add</button>
                    {orders && orders.length > 0 && (
                        <div className="form-group">
                            <h4>Bestelling: </h4>
                            {orders.map((orderEntry, i) => {
                                return (<OrderEntry handleChangeDish={(e) => this.handleChangeDish(e, i)} index={i} entry={orderEntry} dishes={this.state.dishes} handleDeleteDish={(e) => this.handleDeleteDish(e, i)}/>)
                            })}
                        </div>
                    )}
                    <div className="form-group">
                        <h4>Betaling:</h4>
                        <div className="row col-xl-10">
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
                                    <option key="ATLOCATION" value="op locatie">op locatie</option>
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
                                    <option key="DINE-IN" value="aanwezig">aanwezig</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group col-xl-10">
                            <div className="row">
                                <div className="col col-xl-6">
                                    <label>Tijd: </label>
                                    <select name="time" className="form-control mr-3" onChange={this.onChangeInput} value={this.state.time}>
                                        <option key="NONE" value="">geen voorkeur</option>
                                        <option key="11" value="11:00">11:00</option>
                                        <option key="12" value="12:00">12:00</option>
                                        <option key="13" value="13:00">13:00</option>
                                        <option key="16" value="16:00">16:00</option>
                                        <option key="17" value="17:00">17:00</option>
                                        <option key="18" value="18:00">18:00</option>
                                    </select>
                                </div>
                                <div class="form-check" style={checkStyle}>
                                    <input type="checkbox" checked={this.state.paid} onChange={this.onChangeInput} name="paid" class="form-check-input" id="paidCheck"/>
                                    <label class="form-check-label" for="paidCheck">betaald</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col col-5 mt-3">
                                    <button type="submit" className="btn btn-primary">Toevoegen</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}