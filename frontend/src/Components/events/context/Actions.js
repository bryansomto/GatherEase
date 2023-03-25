export const initialState = {
  events: { data: [], page:0,totalPages:0,loading: true, err: { msg: {} } },
};
export const actions = {
  GET_EVENTS: "GET_EVENTS",
  ADD_EVENT: "GET_EVENT",
  DELETE_EVENTS: "DELETE_EVENTS",
  UPDATE_EVENT: "UPDATE_EVENT",
  SET_ERROR: "SET_ERROR",
};
