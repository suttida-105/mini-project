import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import logger from "redux-logger";
const user = {
  id: "",
  name: ""
};
export const allAction = {
  login: user => async dispatch => {
    let res = await axios.post(`http://localhost/`, { ...user });
    const [id, name, surname] = res.data.GetStudentDetailsResult.string;
    dispatch({ type: "LOGIN", id: id, name: name + " " + surname });
  },
  logout: ()=> async dispatch =>{
    dispatch({ type: "LOGOUT" });
  }
};
const loginReducer = (data = user, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...data,
        id: action.id,
        name: action.name
      };
    case "LOGOUT":
      return {
        ...data,
        id: "",
        name: ""
      };
    default:
      return data;
  }
};
const rootReducer = combineReducers({
  user: loginReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);

export default store;
