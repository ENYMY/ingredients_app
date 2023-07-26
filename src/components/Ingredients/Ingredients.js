import React, { useEffect, useState } from "react";
import classes from "./Ingredients.module.css";
import ErrorModal from "../UI/ErrorModal";
import IngredientForm from "./IngredientForm";

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const closeError = () => {
    setError(null);
  };

  const addIngredients = (ingredients) => {
    setIsLoading(true);
    fetch(
      "https://ingredients-app-774b8-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredients),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
      .then((res) => {
        setUserIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: res.name, ...ingredients },
        ]);
      });
  };

  useEffect(() => {
    // setIsLoading(false);
    console.log(userIngredients);
  }, [userIngredients]);
  return (
    <div className={classes.app}>
      {error && <ErrorModal onClose={closeError}>{error}</ErrorModal>}
      <IngredientForm loading={isLoading} onAddIngredient={addIngredients} />
      <section>
        {/* <Search /> */}
        {/* <IngredientLists /> */}
      </section>
    </div>
  );
};

export default Ingredients;
