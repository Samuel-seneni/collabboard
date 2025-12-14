export const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];

    case "EDIT_TASK":
      return state.map((t) =>
        t.id === action.payload.id ? action.payload : t
      );

    case "DELETE_TASK":
      return state.filter((t) => t.id !== action.payload);

    case "TOGGLE_COMPLETE":
      return state.map((t) =>
        t.id === action.payload ? { ...t, completed: !t.completed } : t
      );

      case "REORDER_TASKS":
      // payload: new ordered array of tasks, it usually only active tasks reordered
      return action.payload;

      case "SET_TASKS":
      return action.payload;


    default:
      return state;
  }
};

