// reducer
export default function menuListReducer(preState = {}, action) {
    const { type, data } = action
    switch(type){
        case 'menuList':
            return {...preState,...data};
        default:
            return {...preState}
    }
}