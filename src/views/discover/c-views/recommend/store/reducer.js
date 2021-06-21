import * as actionType from "./constants";

let defaultState = {
  banner: [],
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionType.GET_BANNER:
      return { ...state };
    default:
      return { ...state };
  }
}

export default reducer;
