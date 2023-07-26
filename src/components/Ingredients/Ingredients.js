import React, { useState } from "react";
import classes from "./Ingredients.module.css";
import ErrorModal from "../UI/ErrorModal";

const Ingredients = () => {
  const [error, setError] = useState(true);
  const closeError = () => {
    setError(null);
  };
  return (
    <div className={classes.app}>
      {error && <ErrorModal onClose={closeError}>{error}</ErrorModal>}
      {/* <IngredientForm /> */}
      <section>
        {/* <Search /> */}
        {/* <IngredientLists /> */}
      </section>
    </div>
  );
};

export default Ingredients;
