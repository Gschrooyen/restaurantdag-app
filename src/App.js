import React from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component.js"
import ReservationList from "./components/reservation-list.component.js"
import EditReservation from "./components/edit-reservation.component.js"
import CreateReservation from "./components/create-reservation.component.js"


function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={ReservationList}/>
        <Route path="/edit/:id" component={EditReservation}/>
        <Route path="/create" component={CreateReservation}/>
      </div>
    </Router>
  );
}

export default App;
