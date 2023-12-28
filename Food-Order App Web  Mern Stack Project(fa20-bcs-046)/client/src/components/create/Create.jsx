import React from "react";
import classes from "./create.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Create = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [review, setReview] = useState("");
  const navigate = useNavigate();
  // we get the auth slice from the entire state, which(auth slice)
  // is the userInfo and the token
  const { token } = useSelector((state) => state.auth);

  // type="file", e.target.files[0]
  const onChangeFile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCloseImg = () => {
    setImage("");
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    try {
      // uploading product
      const res = await fetch(`http://localhost:5000/product`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          category,
          price,
          review,
        }),
      });

      const food = await res.json();

      navigate(`/foods`);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.title}>Create food</h2>
        <form onSubmit={handleCreateProduct}>
          <div className={classes.inputWrapper}>
            <label>Title: </label>
            <input
              type="text"
              placeholder="Title..."
              className={classes.input}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={classes.inputWrapper}>
            <label>Description: </label>
            <input
              type="text"
              placeholder="Description..."
              className={classes.input}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className={classes.inputWrapper}>
            <label>Category: </label>
            <input
              type="text"
              placeholder="Category..."
              className={classes.input}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className={classes.inputWrapper}>
            <label>Price: </label>
            <input
              type="number"
              step={0.01}
              placeholder="Price..."
              className={classes.input}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className={classes.inputWrapper}>
            <label>Review: </label>
            <input
              type="number"
              step={0.1}
              min={1}
              max={5}
              placeholder="Review..."
              className={classes.input}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
          <div className={classes.buttonWrapper}>
            <button type="submit" className={classes.submitBtn}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
