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
    setUserIngredients((prevIngredients) => [
      ...prevIngredients,
      { id: Math.random().toString(), ...ingredients },
    ]);
  };

  useEffect(() => {
    setIsLoading(false);
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
