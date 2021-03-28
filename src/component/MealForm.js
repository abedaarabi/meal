import { React } from "react";
import { useForm } from "react-hook-form";
import { BrowserRouter as Router, Link } from "react-router-dom";
function MealForm({ postData }) {
  const { register, handleSubmit } = useForm("");

  const onSubmit = (data) => {
    const dataForm = new FormData();
    data.id = Math.floor(Math.random() * 100);
    // data.image = data.image[0];
    // dataForm.append("image", data.image[0]);
    dataForm.append("title", data.title);
    dataForm.append("reviews", data.reviews);
    dataForm.append("price", data.price);
    dataForm.append("created_date", data.created_date);
    dataForm.append("limit", data.limit);

    console.log(dataForm);

    if (!data.title || !data.limit) {
      return alert("Inputs Empty");
    } else {
      const axios = require("axios");
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      axios
        .post("http://104.131.66.109:5000/meal", dataForm, config)
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
      postData(data);
    }
  };
  return (
    <div>
      <Link to={"/"}> Home </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title</label>
          <input type="text" name="title" ref={register} />
        </div>
        <div>
          <label>Reviews</label>
          <input type="text" name="reviews" ref={register} />
        </div>
        <div>
          <label>Limit</label>
          <input type="text" name="limit" ref={register} />
        </div>
        <div>
          <label>Date</label>
          <input type="date" name="created_date" ref={register} />
        </div>
        <div>
          <label>Price</label>
          <input type="text" name="price" ref={register} />
        </div>
        {/* <div>
          <label>image</label>
          <input type="file" name="image" ref={register} />
        </div> */}
        <div>
          <button type="submit">Add Meal</button>
        </div>
      </form>
    </div>
  );
}

export default MealForm;
