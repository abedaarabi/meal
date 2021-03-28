import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BrowserRouter as Router, useParams } from "react-router-dom";

function ReservationFrom({ postItem, mealLimit, reservations }) {
  const params = useParams();
  const { register, handleSubmit } = useForm("");
  const [newReservation, setNewReservation] = useState(false);
  let myLimit;
  mealLimit.map((meal) => {
    return reservations.find((reservation) => {
      if (Number(reservation.mealId) === meal.id) {
        return (myLimit = meal.limit);
      }
      return reservation.mealId;
    });
  });
  const onSubmit = (data) => {
    if (myLimit < reservations.length + 1) {
      setNewReservation(true);
    } else {
      data.id = Math.floor(Math.random() * 100);
      data.mealId = params.id;
      console.log(data);
      if (!data.name || !data.email) {
        return alert("Inputs Empty");
      } else {
        const axios = require("axios");
        axios
          .post("http://104.131.66.109:5000/reservations", data)
          .then((response) => console.log(response))
          .catch((err) => console.log(err));
        postItem(data);
      }
    }
  };
  useEffect(() => {
    const time = setTimeout(() => {
      setNewReservation(false);
    }, 500);
    return () => clearTimeout(time);
  });
  return (
    <div>
      <div>
        <h3 style={{ color: "blue" }}>
          you have {myLimit} / {reservations.length} resrvation
        </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>User Name</label>
          <input type="text" name="name" ref={register} />
        </div>
        <div>
          <label>Email</label>
          <input type="text" name="email" ref={register} />
        </div>
        <div>
          <label>Phone Number</label>
          <input type="text" name="phonenumber" ref={register} />
        </div>
        <div>
          <button type="submit">Add Reservation</button>
        </div>
      </form>

      {newReservation ? (
        <div>
          <h1 style={{ backgroundColor: "red", color: "white" }}>
            Accede the limit
          </h1>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ReservationFrom;
