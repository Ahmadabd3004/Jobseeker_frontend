let initialState = {
  data: [],
  detailJob: {},
};

export default function rootReducers(state = initialState, action) {
  switch (action.type) {
    case "jobs/fetchData":
      return { ...state, data: action.data };

    case "jobs/detail":
      return { ...state, detailJob: action.data };

    default:
      return state;
  }
}
