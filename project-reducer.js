
//@ts-check

// Reducers specify how the application's state changes in response to actions sent to the store.

import {

    UPDATE_FORM_PAGE,
    OPEN_PROJECTS,
    CLOSE_PROJECTS,
    NEXT_PAGE,
    PREVIOUS_PAGE,
    UPDATE_FORM_INDUSTRY,
    UPDATE_FORM_TYPE,
    NEXT_POST,
    PREVIOUS_POST,
    FIRE_LIST
  }                       from './project-action';

  const start = {
    projectState:     false,
    formPage:         0,
    option:           'Green Horn',
    industry:         'residential',
    types:            'Renovation',
    posts:            0,
    customer:         'contractor',
    fireList:         []
  };

// start by specifying the initial state: function App(state = initialState, action) { return state }
  const projects = ( state = start, action ) => {
    switch ( action.type ) {

      // Don't Do:
      // Mutate its arguments;
      // Perform side effects like API calls and routing transitions;
      // Call non-pure functions, e.g. Date.now() or Math.random()

      case OPEN_PROJECTS:         return { ...state, projectState:   true };
      case CLOSE_PROJECTS:        return { ...state, projectState:   false };

      case UPDATE_FORM_PAGE:      return { ...state, option: action.option };
      case UPDATE_FORM_INDUSTRY:  return { ...state, industry: action.industry };
      case UPDATE_FORM_TYPE:      return { ...state, types: action.types };
      case FIRE_LIST:             return { ...state, fireList: action.list };

      case NEXT_PAGE:             return { ...state, formPage: state.formPage + 1 };
      case PREVIOUS_PAGE:         return { ...state, formPage: state.formPage - 1 };

      case NEXT_POST:             return { ...state, posts: state.posts + 1 };
      case PREVIOUS_POST:         return { ...state, posts: state.posts - 1 };

      // ( ... ) object spread syntax, similar to the ES6 array spread operator.
      // To copy enumerable properties from one object to another

    default:

      // calculate the next state and return it
      return state;

    }
  }
  
  export default projects;

// babel-plugin-transform-object-rest-spread


/*

      // case UPDATE_PROJECT:  console.log('Update Project');   return { ...state, projectState: action.openProject };

    // nextPageGo:       0,
    // previousPageGo:   0

    // INCREMENT,
    // DECREMENT,

      case INCREMENT:
        return {
          'clicks': state.clicks  + 1,
          'value':  state.value   + 1
        };

      case DECREMENT:
        return {
          'clicks': state.clicks  + 1,
          'value':  state.value   - 1
        };

*/