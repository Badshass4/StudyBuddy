const initState = {
    snackbarOpen: false,
    snackbarType: "",
    snackbarMessage: ""
}

export default (state = initState, action) => {
    switch (action.type) {
        case "SET_SNACKBAR":
            const { snackbarOpen, snackbarMessage, snackbarType } = action;
            return {
                ...state,
                snackbarOpen,
                snackbarType,
                snackbarMessage
            };
        default:
            return state;
    }
};

export const setSnackbar = (
    snackbarOpen,
    snackbarType = "success",
    snackbarMessage = ""
) => ({
    type: "SET_SNACKBAR",
    snackbarOpen,
    snackbarType,
    snackbarMessage
});