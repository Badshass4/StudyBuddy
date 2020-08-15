/*
   This reducer is used to get and set the values reqd for below topics :
      > isAdmin
      > userFullName
      > userMail
      > userName
      > authToken
*/

const initState = {
    isAdmin: false,
    userFirstName: "",
    userLastName: "",
    userMail: "",
    userName: "",
    userPhoneNo: "",
    userCollege: "",
    userCourse: "",
    userStream: "",
    userImagePath: "",
    authToken: ""
}

export default (state = initState, action) => {
    switch (action.type) {
        case "SET_IS_ADMIN":
            return {
                ...state,
                isAdmin: action.payload
            };
        case "SET_USERFIRSTNAME":
            return {
                ...state,
                userFirstName: action.payload
            };
        case "SET_USERLASTNAME":
            return {
                ...state,
                userLastName: action.payload
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
        case "SET_USERPHONENO":
            return {
                ...state,
                userPhoneNo: action.payload
            };

        case "SET_USERCOLLEGE":
            return {
                ...state,
                userCollege: action.payload
            };
        case "SET_USERCOURSE":
            return {
                ...state,
                userCourse: action.payload
            };
        case "SET_USERSTREAM":
            return {
                ...state,
                userStream: action.payload
            };
        case "SET_USERIMAGEPATH":
            return {
                ...state,
                userImagePath: action.payload
            };
        case "SET_AUTHTOKEN":
            return {
                ...state,
                authToken: action.payload
            };
        default:
            return state;
    }
};

export const setIsAdmin = (userMode) => ({
    type: 'SET_IS_ADMIN',
    payload: userMode
});

export const setUserFirstName = (userFirstName) => ({
    type: 'SET_USERFIRSTNAME',
    payload: userFirstName
});

export const setUserLastName = (userLastName) => ({
    type: 'SET_USERLASTNAME',
    payload: userLastName
});

export const setUserMail = (userMail) => ({
    type: 'SET_USERMAIL',
    payload: userMail
});

export const setUserName = (userName) => ({
    type: 'SET_USERNAME',
    payload: userName
});

export const setUserPhoneNo = (userPhoneNo) => ({
    type: 'SET_USERPHONENO',
    payload: userPhoneNo
});

export const setUserCollege = (userCollege) => ({
    type: 'SET_USERCOLLEGE',
    payload: userCollege
});

export const setUserCourse = (userCourse) => ({
    type: 'SET_USERCOURSE',
    payload: userCourse
});

export const setUserStream = (userStream) => ({
    type: 'SET_USERSTREAM',
    payload: userStream
});

export const setUserImagePath = (userImagePath) => ({
    type: 'SET_USERIMAGEPATH',
    payload: userImagePath
});

export const setAuthToken = (authToken) => ({
    type: 'SET_AUTHTOKEN',
    payload: authToken
});