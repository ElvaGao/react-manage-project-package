// reducer
export default function tokenReducer(preState = '', action) {
    const { type, data } = action
    switch(type){
        case 'token':
            return data;
        default:
            return preState
    }
}