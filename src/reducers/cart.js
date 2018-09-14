
export default  function (state = [], action) {
    switch (action.type) {
        case 'TOGGLE':
            const seat = state.find((item) => item.id === action.payload.id);
            console.log(seat);
            return seat !== undefined ? state.filter((item) => item.id !== seat.id ) : [...state, action.payload];

        case 'REMOVE_ALL':
            return [];
        default:
            return state;
    }
};