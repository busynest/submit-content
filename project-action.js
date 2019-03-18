
// @ts-check

// Actions are payloads of information that send data from your application to your store.
// the only source of information for the store.

export const OPEN_PROJECTS            = 'OPEN_PROJECTS';
export const CLOSE_PROJECTS           = 'CLOSE_PROJECTS';
export const NEXT_PAGE                = 'NEXT_PAGE';
export const PREVIOUS_PAGE            = 'PREVIOUS_PAGE';
export const UPDATE_FORM_PAGE         = 'UPDATE_FORM_PAGE';
export const UPDATE_FORM_TYPE         = 'UPDATE_FORM_TYPE';
export const UPDATE_FORM_INDUSTRY     = 'UPDATE_FORM_INDUSTRY';
export const NEXT_POST                = 'NEXT_POST';
export const PREVIOUS_POST            = 'PREVIOUS_POST';
export const FIRE_LIST                = 'FIRE_LIST';

// Action creators are functions that create actions.
// To initiate Action Creators, pass the result to the dispatch() function

export const createProject            = (openProject)   => (dispatch) => { dispatch({ type: OPEN_PROJECTS,  openProject }); }
export const closeProject             = (closeProject)  => (dispatch) => { dispatch({ type: CLOSE_PROJECTS, closeProject }); }
export const fireList                 = (list) => { return { type: FIRE_LIST, list }; };

export const nextPage                 = () => { return { type: NEXT_PAGE }; }
export const previousPage             = () => { return { type: PREVIOUS_PAGE }; }

export const nextPost                 = () => { return { type: NEXT_POST }; }
export const previousPost             = () => { return { type: PREVIOUS_POST }; }

/* Option Case */
export const customer = (ev) => {
  const option = ev;
  switch(option) {
    
    case 'homeowner':
      break;
    case 'contractor':
      break;
    case 'subcontractor':
      break;
    case 'labourer':
      break;
    case 'supplier':
      break;
    case 'agency':
      break;

  }
  return { type: UPDATE_FORM_PAGE, option }
}

/* Industry Case */
export const industry = (e) => {
  const industry = e;
  switch(industry) {
    
    case 'commercial':
      break;
    case 'residential':
      break;

  }
  return { type: UPDATE_FORM_INDUSTRY, industry }
}

/* Type Case */
export const type = (e) => {
  const types = e;
  switch(types) {
    
    case 'New construction':
      break;
    case 'Renovation':
      break;
    case 'Maintanance':
      break;
    case 'Sustainability':
      break;
      
  }
  return { type: UPDATE_FORM_TYPE, types }
}


// send them to the store using store.dispatch()
// Actions must have a type property that indicates the type of action being performed.
// Types should typically be defined as string constants.

// Bound Action Creator: export const boundAddTodo = text => dispatch(addTodo(text))

// The dispatch() function can be accessed directly from the store as store.dispatch()

/* Option Update */
//const update                      = (option) => {
//  return {
//    type: UPDATE_FORM_PAGE,
//    option
//  }
// }

/* Option Load 
export const load                 = (ev) => (dispatch) => {
  const option = ev;
  dispatch(customer(option));
}
*/