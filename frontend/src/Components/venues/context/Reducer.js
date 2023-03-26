import { actions } from "./Actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.GET_VENUES: {
      const { venues } = action.payload;
      console.log(venues);
      const { data, page, totalPages } = venues;
      return {
        ...state,
        venues: { ...state.venues, data, page, totalPages, loading: false },
      };
    }
    default: {
      throw new Error(`No such action as ${action.type}`);
    }
  }
};
