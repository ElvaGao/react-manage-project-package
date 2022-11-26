// reducer
export default function roleListReducer(preState = [], action) {
    const { type, data } = action
    switch(type){
        case 'roleList':
            return data;
        default:
            return preState
    }
}