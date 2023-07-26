import React, { useState } from "react";
import classes from "./IngredientForm.module.css";
import Card from "../UI/Card";
import LoadingIndicator from "../UI/LoadingIndicator";
const IngredientForm = React.memo((props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };
  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddIngredient({ amount: enteredAmount, title: enteredTitle });
  };
  return (
    <section className={classes.ingredient_form}>
      <Card>
        <form onSubmit={submitHandler}>
          <div className={classes.form_control}>
            <label htmlFor='title'>Name</label>
            <input
              type='text'
              name='title'
              id='title'
              value={enteredTitle}
              onChange={titleChangeHandler}
            />
          </div>
          <div className={classes.form_control}>
            <label htmlFor='amount'>Amount</label>
            <input
              type='number'
              name='amount'
              id='amount'
              value={enteredAmount}
              onChange={amountChangeHandler}
            />
          </div>
          <div className={classes.ingredient_form__actions}>
            <button type='submit'>Add Ingredients</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
