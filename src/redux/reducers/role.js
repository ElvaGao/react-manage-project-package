// reducer
export default function roleReducer(preState = {}, action) {
    const { type, data } = action
    switch(type){
        case 'role':
            return {...preState,...data};
        default:
            return preState
    }
}