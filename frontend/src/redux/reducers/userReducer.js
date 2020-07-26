/*
   This reducer is used to get and set the values reqd for below topics :
      > isAdmin
      > userFullName
      > userMail
      > userName
*/

const initState = {
    isAdmin: false,
    userFullName: "",
    userMail: "",
    userName: ""
}

export default (state = initState, action) => {
    switch (action.type) {
        case "SET_IS_ADMIN":
            return {
                ...state,
                isAdmin: action.payload
            };
        case "SET_USERFULLNAME":
            return {
                ...state,
                userFullName: action.payload
            };
        case "SET_USERMAIL":
            return {
                ...state,
                userMail: action.payload
            };
        case "SET_USERNAME":
            return {
                ...state,
                userName: action.payload
            };
        default:
            return state;
    }
};

export const setIsAdmin = (userMode) =>({
    type: 'SET_IS_ADMIN',
    payload: userMode
});

export const setUserFullName = (userFullName) =>({
    type: 'SET_USERFULLNAME',
    payload: userFullName
});

export const setUserMail = (userMail) =>({
    type: 'SET_USERMAIL',
    payload: userMail
});

export const setUserName = (userName) =>({
    type: 'SET_USERNAME',
    payload: userName
});