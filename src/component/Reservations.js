import { React, useState, useEffect } from "react";
import ReservationFrom from "./ReservationFrom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

function Reservations({ mealLimit }) {
  const [reservations, setReservations] = useState([]);
  const params = useParams();
  const addItem = (data) => {
    const newReservations = reservations.concat(data);
    setReservations(newReservations);
  };
  const fetctData = () => {
    fetch(`http://104.131.66.109:5000/reservations/${params.id}`)
      .then((res) => res.json())
      .then((data) => setReservations(data))
      .catch((err) => console.log(err));
  };
  const remove = async (id) => {
    const axios = require("axios");
    const newArr = reservations.filter((item) => item.id !== id);
    console.log(newArr);
    await axios.delete(`http://104.131.66.109:5000/reservations?id=${id}`);
    setReservations(newArr);
  };
  useEffect(() => {
    fetctData();
  }, []);
  return (
    <div>
      <ReservationFrom
        postItem={addItem}
        mealLimit={mealLimit}
        reservations={reservations}
      />
      {reservations.map((reservation) => (
        <li key={reservation.id}>
          <p>name: {reservation.name}</p>
          <p>email: {reservation.email}</p>
          <p>phonenumber: {reservation.phonenumber}</p>
          <button onClick={() => remove(reservation.id)}>remove</button>
        </li>
      ))}
    </div>
  );
}

export default Reservations;
