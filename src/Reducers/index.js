import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// import TipReducer from './set_current_tip';


const reducers = {
    form: formReducer,
    // currentTip: TipReducer
}

const rootReducer = combineReducers(reducers);

export default rootReducer;