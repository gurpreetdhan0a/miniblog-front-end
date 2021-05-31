const authReducer =  (state={isSignedIn: null, userId:null, username:null}, action )=>{
    switch (action.type) {
        case 'SIGN_IN':
            return {...state, isSignedIn:true, userId: action.payload, username: action.username};
        case 'SIGN_OUT':
            return {...state, isSignedIn:false, userId: null, username: null};
        default:
            return state;
    }
}

export default authReducer;