const alertReducer = (state, action) => {
    // eslint-disable-next-line default-case
    switch(action.type) {
        case 'SET_ALERT':
            return action.payload
        case 'REMOVE_ALERT':
            return null
        default:
            return state
            
    }
}

export default alertReducer