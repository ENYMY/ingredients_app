import { useCallback, useReducer } from "react";

const initialState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: null,
};

const httpReducer = (currentHttp, action) => {
  switch (action.type) {
    case "SEND":
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: action.identifier,
      };
    case "RESPONSE":
      return {
        ...currentHttp,
        loading: false,
        data: action.responseData,
        extra: action.extra,
      };
    case "ERROR":
      return { loading: false, error: action.errorMessage };
    case "CLEAR":
      return initialState;
    default:
      throw new Error("Something Went Wrong!");
  }
};
const useHttp = () => {
  const [httpState, dispatch] = useReducer(httpReducer, initialState);

  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const sendRequest = useCallback(
    (url, method, body, reqExtra, reqIdentifier) => {
      dispatch({ type: "SEND", identifier: reqIdentifier });
      fetch(url, {
        method: method,
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          dispatch({ type: "RESPONSE", data: responseData, extra: reqExtra });
        })
        .catch((error) => {
          dispatch({ type: "ERROR", errorMessage: "Something went wrong!" });
        });
    },
    []
  );

  return {
    isLoading: httpState.loading,
    error: httpState.error,
    data: httpState.data,
    sendRequest: sendRequest,
    requestExtra: httpState.extra,
    identifier: httpState.identifier,
    clear: clear,
  };
};

export default useHttp;
