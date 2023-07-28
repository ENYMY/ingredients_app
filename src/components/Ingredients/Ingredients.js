import React, { useCallback, useEffect, useReducer, useState } from "react";
import classes from "./Ingredients.module.css";
import ErrorModal from "../UI/ErrorModal";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter(
        (ingredient) => ingredient.id !== action.id
      );
    default:
      throw new Error("Should Not Get There");
  }
};

const httpReducer = (currentHttp, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null };
    case "RESPONSE":
      return { ...currentHttp, loading: false };
    case "ERROR":
      return { loading: false, error: action.error };
    case "CLEAR":
      return { ...currentHttp, error: null };
    default:
  }
};

const Ingredients = () => {
  // const [userIngredients, setUserIngredients] = useState([]);
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });
  const closeError = () => {
    // setError(null);
    dispatchHttp({ type: "CLEAR" });
  };

  const addIngredients = (ingredients) => {
    // setIsLoading(true);
    dispatchHttp({ type: "SEND" });
    fetch(
      "https://ingredients-app-774b8-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredients),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        // setIsLoading(false);
        dispatchHttp({ type: "RESPONSE" });
        return response.json();
      })
      .then((res) => {
        dispatch({ type: "ADD", ingredient: { id: res.name, ...ingredients } });
        // setUserIngredients((prevIngredients) => [
        //   ...prevIngredients,
        //   { id: res.name, ...ingredients },
        // ]);
      });
  };

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    // setUserIngredients(filteredIngredients);
    dispatch({ type: "SET", ingredients: filteredIngredients });
  }, []);

  const removeItemHandler = (ingredientId) => {
    // setIsLoading(true);
    dispatchHttp({ type: "SEND" });
    console.log(ingredientId);
    fetch(
      `https://ingredients-app-774b8-default-rtdb.firebaseio.com/${ingredientId}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        // setIsLoading(false);
        dispatchHttp({ type: "RESPONSE" });
        // setUserIngredients((prevIngredients) =>
        //   prevIngredients.filter((ingredient) => ingredient.id !== ingredientId)
        // );
        dispatch({ type: "DELETE", id: ingredientId });
      })
      .catch((error) => {
        // setError("Something went wrong!");
        // setIsLoading(false);
        dispatchHttp({ type: "ERROR", error: "Something went Wrong" });
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
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeItemHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
