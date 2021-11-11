import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actionCreators } from "../state";
import { useActions } from "../hooks/useActions";
import { useSelector } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { searchRepositories } from "../state/action-creators/index";

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState("");
  //const dispatch = useDispatch(); // This hook returns a reference to the dispatch function from the Redux store

  const { searchRepositories } = useActions();

  // extract data from the Redux store state, using a selector function
  const { data, error, loading } = useTypedSelector(
    (state) => state.repositories
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // simple way to using dispatch
    // dispatch(actionCreators.searchRepositories(term));

    // using dispatch with custom hook to make code more readable
    searchRepositories(term);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={term} onChange={(e) => setTerm(e.target.value)} />
        <button>Search</button>
      </form>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading...</h3>}
      {!error && !loading && data.map((name) => <div key={name}>{name}</div>)}
    </div>
  );
};

export default RepositoriesList;
