const initState = {
    courseId: "",
    streamId: "",
    year: 0
}

export default (state = initState, action) => {
    switch (action.type) {
        case "SET_COURSEID":
            return {
                ...state,
                courseId: action.payload
            };
        case "SET_STREAMID":
            return {
                ...state,
                streamId: action.payload
            };
        case "SET_YEAR":
            return {
                ...state,
                year: action.payload
            };
        default:
            return state;
    }
};

export const setCourseId = (courseId) =>({
    type: 'SET_COURSEID',
    payload: courseId
});

export const setStreamId = (streamId) =>({
    type: 'SET_STREAMID',
    payload: streamId
});

export const setYear = (year) =>({
    type: 'SET_YEAR',
    payload: year
});