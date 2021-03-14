import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OrderEntry from './orderentry.component';
import UserEntry from "./orderentry.component"

export default class CreateReservation extends Component {
    constructor(props) {
        super(props)

        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeCity = this.onChangeCity.bind(this)
        this.onChangeZipCode = this.onChangeZipCode.bind(this)
        this.onChangeStreet = this.onChangeStreet.bind(this)
        this.onChangeNumber = this.onChangeNumber.bind(this)
        this.onChangeAppartment = this.onChangeAppartment.bind(this)
        this.onChangeRemarks = this.onChangeRemarks.bind(this)
        this.onChangePayment = this.onChangePayment.bind(this)
        this.onChangeReservationType = this.onChangeReservationType.bind(this)

        this.state = {
            name: '',
            city: '',
            zipCode: '',
            street: '',
            number: '',
            appartment: '',
            remarks: '',
            order: [],
            payment: '',
            reservationType: ''
        }
    }

    componentDidMount() {
        this.setState({
            payment: "overschrijving"
        })
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        })
    }

    onChangeCity(e){
        this.setState({
            city: e.target.value
        })
    }

    onChangeZipCode(e){
        this.setState({
            zipCode: e.target.value
        })
    }

    onChangeStreet(e){
        this.setState({
            street: e.target.value
        })
    }

    onChangeNumber(e){
        this.setState({
            number: e.target.value
        })
    }

    onChangeAppartment(e){
        this.setState({
            appartment: e.target.value
        })
    }

    onChangeRemarks(e){
        this.setState({
            remarks: e.target.value
        })
    }

    onChangePayment(e){
        this.setState({
            payment: e.target.value
        })
    }

    onChangeReservationType(e){
        this.setState({
            reservationType: e.target.value
        })
    }

    onSubmit(e){
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

  render() {
    return (
      <div>
          <h3>Nieuwe inschrijving</h3>
          <form onSubmit={this.onSubmit}>
              <div className="form-group col-xl-12">
                  <label>naam: </label>
                  <input type="text" 
                    value={this.state.name}
                    onChange= {this.onChangeName}
                    className="form-control col-xl-4"
                    placeholder="Naam"
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
                                value={this.state.zipCode}
                                onChange={this.onChangeZipCode}
                            />
                        </div>
                        <div className="col col-xl-8">
                            <label>gemeente: </label>
                            <input type="text"
                                className="form-control"
                                onChange={this.onChangeCity}
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
                                onChange={this.onChangeStreet}
                                value={this.state.street}
                                placeholder="Straat"
                            />
                        </div>
                        <div className="col col-xl-2">
                            <label>nummer: </label>
                            <input type="text"
                                className="form-control"
                                onChange={this.onChangeNumber}
                                value={this.state.number}
                                placeholder="Nummer"
                            />
                        </div>
                        <div className="col col-xl-2">
                            <label>bus: </label>
                            <input type="text"
                                className="form-control"
                                onChange={this.onChangeAppartment}
                                value={this.state.appartment}
                                placeholder="Bus"
                            />
                        </div>
                    </div>
                    <div className="row col-xl-10">
                        <div className="col">
                            <label>opmerkingen: </label>
                            <textarea className="form-control"
                                onChange={this.onChangeRemarks}
                                value={this.state.remarks}
                                placeholder="Remarks"
                                rows="3"
                            />
                        </div>
                    </div>
              </div>
              <div className="form-group">
                  <h4>Bestelling: </h4>
                  {this.state.order.map((orderEntry, i) => {
                      return (<OrderEntry value={orderEntry} />)
                  })}
              </div>
              <div className="form-group">
                  <h4>Betaling:</h4>
                  <div className="row">
                      <div className="col col-xl-6">
                        <label>methode: </label>
                        <select className="form-control"
                            value={this.state.payment}
                            onChange={this.onChangePayment}>
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
                            onChange={this.onChangeReservationType}>
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