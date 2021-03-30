import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";

function ReservationFrom({ postItem, meals, reservations }) {
  const params = useParams();
  const { register, handleSubmit } = useForm("");
  const [isReservationAllowed, setIsReservationAllowed] = useState(false);
  const currentMeal = meals.find((paramId) => Number(params.id) === paramId.id);

  const mealReservations = reservations.filter(
    (reservation) => reservation.mealId === params.id
  );

  const onSubmit = (data) => {
    console.log(currentMeal.limit, mealReservations.length);
    if (!(mealReservations.length < currentMeal.limit)) {
      setIsReservationAllowed(true);
      return;
    }

    data.id = Date.now() * Math.floor(Math.random() * 100);
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
    }
    postItem(data);
  };

  useEffect(() => {
    const time = setTimeout(() => {
      setIsReservationAllowed(false);
    }, 2 * 1000);
    return () => clearTimeout(time);
  });
  if (!currentMeal) {
    return (
      <div>
        <Link to={"/"}> Home </Link>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h3 style={{ color: "blue" }}>
          you have {currentMeal.limit} / {reservations.length} reservations
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

      {isReservationAllowed ? (
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
