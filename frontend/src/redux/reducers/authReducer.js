/*
   This reducer is used to get and set the values reqd for below topics :
      > isLoggedIn
*/

const initState = {
    isLoggedIn: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case "SET_LOG_IN":
            return {
                ...state,
                isLoggedIn: action.payload
            };
        default:
            return state;
    }
};

export const setLogIn = (authMode) =>({
    type: 'SET_LOG_IN',
    payload: authMode
});