/*
   This reducer is used to get and set the values reqd for below topics :
      > isLoader
*/

const initState = {
    isLoader: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case "SET_LOADER":
            return {
                ...state,
                isLoader: action.payload
            };
        default:
            return state;
    }
};

export const setLoader = (loaderMode) =>({
    type: 'SET_LOADER',
    payload: loaderMode
});