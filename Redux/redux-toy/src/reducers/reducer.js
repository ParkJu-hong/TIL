export default function reducer(state, action){
    if(state !== undefined){
        return {
            nowId: 1,
            contents: [{id: 1, text: 'first'}]
        }
    }else if(action.type ===  'CHANGE_NOW_ID'){
        return Object.assign({}, state, {
            nowId: action.payload.id
        });
    }
}