import { combineReducers } from "redux";

import { reducer as recommendReducer } from "@/views/discover/c-views/recommend/store";

const reducer = combineReducers({
  recommend: recommendReducer,
});

export default reducer;
