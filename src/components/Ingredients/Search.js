import React, { useEffect, useRef, useState } from "react";
import classes from "./Search.module.css";
import Card from "../UI/Card";
const Search = (props) => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${enteredFilter}"`;
        fetch(
          "https://ingredients-app-774b8-default-rtdb.firebaseio.com/ingredients.json" +
            query
        )
          .then((response) => response.json())
          .then((resData) => {
            const loadedIngredients = [];
            for (const key in resData) {
              loadedIngredients.push({
                id: key,
                title: resData[key].title,
                amount: resData[key].amount,
              });
              onLoadIngredients(loadedIngredients);
            }
          });
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, inputRef, onLoadIngredients]);
  return (
    <section className={classes.search}>
      <Card>
        <div className={classes.search_input}>
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type='text'
            value={enteredFilter}
            onChange={(event) => {
              setEnteredFilter(event.target.value);
            }}
          />
        </div>
      </Card>
    </section>
  );
};

export default Search;
