// reducer
export default function roleListReducer(preState = {}, action) {
    const { type, data } = action
    switch(type){
        case 'roleList':
            return {...preState,...data};
        default:
            return {...preState}
    }
}