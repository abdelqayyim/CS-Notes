import React, { useReducer, useEffect } from "react";
import Message from "./components/message-popup/Message";
import AddLanguagePopUp from './components/PopUps/AddLanguagePopUp';
import DeleteLanguagePopUp from './components/PopUps/DeleteLanguagePopUp';
import InputError from './components/PopUps/InputError';
import AddNotePopUp from './components/PopUps/AddNotePopUp';

const ACTIONS = {
  FETCH_LANGUAGES: "fetch-languages",
  FETCH_NOTES: "fetch-notes",
  SHOW_SPINNER: "show-spinner",
  SHOW_INPUT_RESPONSE: "show-input-response",
  TOGGLE_MENU: "toggle-menu",
  ADD_NOTE: "add-note",
  DELETE_NOTE: "delete-note",
  CURRENT_LANGUAGE: "current-language",
  CHANGE_CURRENT_LANGUAGE: "change-current-language",
  CHANGE_CURRENT_NOTE: "change-current-note",
    HIDE_SPINNER: "hide-spinner",
    TOGGLE_ADD_LANGUAGE_POPUP: 'toggle-add-language-popup',
    TOGGLE_DELETE_LANGUAGE_POPUP: 'toggle-delete-language-popup',
    TOGGLE_ADD_NOTE_POPUP: 'toggle-add-note-popup'
};

// let currentDetail = {
//     currentLanguage:undefined,
//     currentLanguages: [],
//     currentNote: { 'noteTitle': undefined, 'noteDescription': undefined, 'noteDetails': undefined, "noteID": undefined },
//     showSpinner: {"isShowing":false,"spinnerMessage":undefined},
//     showInputResponse:{'isErrorInput':false,"errorType":undefined,"message": undefined},
// }
// const reducer = (state, action, payload) => {
//     switch (action.type) {
//         case ACTIONS.FETCH_LANGUAGES:
//             const getLanguges = async () => {
//                 reducer(state, { type: ACTIONS.SHOW_SPINNER }, "");
//                 const response = await fetch('https://frequentquestions.herokuapp.com/languages/')
//                 const data = await response.json();

//                 state.currentLanguages = data.reverse;
//                 reducer(state, { type: ACTIONS.HIDE_SPINNER }, "");

//             }
//             getLanguges();
//             return {...state}
//         case ACTIONS.HIDE_SPINNER:
//             console.log('HIDING SPINNER')
//             state.showSpinner = { isShowing: false, spinnerMessage: "Fetching Languages" };
//             return {...state}
//         case ACTIONS.SHOW_SPINNER:
//             console.log('SHOWING SPINNER')
//             state.showSpinner = { isShowing: true, spinnerMessage: "Fetching Languages" };
//             return {...state}
//         case ACTIONS.FETCH_NOTES:
//             return state
//         case ACTIONS.SHOW_SPINNER:
//             return state
//         case ACTIONS.SHOW_INPUT_RESPONSE:
//             return state
//         case ACTIONS.IS_LOADING:
//             return state
//         case ACTIONS.TOGGLE_MENU:
//             return state
//         case ACTIONS.ADD_NOTE:
//             return state
//         case ACTIONS.DELETE_NOTE:
//             return state
//         case ACTIONS.CURRENT_LANGUAGE:
//             return state
//         case ACTIONS.CURRENT_NOTE:
//             return state
//         case ACTIONS.CHANGE_CURRENT_LANGUAGE:
//             return state
//         case ACTIONS.CHANGE_CURRENT_NOTE:
//             return state
//         default:
//             return
//     }
// }

export const AppProvider = React.createContext();
const AppContext = (props) => {
    const reducer = (state, action) => {
        switch (action.type) {
            case ACTIONS.FETCH_LANGUAGES:
                let data = action.payload.d;
                state.currentLanguages = data;
                return { ...state }
            case ACTIONS.HIDE_SPINNER:
                return {
                    ...state,
                    showSpinner: { isShowing: false, spinnerMessage: "" },
                };
            case ACTIONS.SHOW_SPINNER:
                return {
                    ...state,
                    showSpinner: { isShowing: true, spinnerMessage: action.payload.message },
                };
            case ACTIONS.FETCH_NOTES:
                state.currentNotes = action.payload.notes
                return { ...state }
            case ACTIONS.SHOW_SPINNER:
                return state;
            case ACTIONS.SHOW_INPUT_RESPONSE:
                state.showInputResponse.isErrorInput = action.payload.isErrorInput;
                state.showInputResponse.errorType = action.payload.errorType;
                state.showInputResponse.message = action.payload.message;
                return { ...state };
            case ACTIONS.IS_LOADING:
                return state;
            case ACTIONS.TOGGLE_MENU:
                state.activeDropMenu = action.payload.mode;
                return { ...state };
            case ACTIONS.DELETE_NOTE:
                return state;
            case ACTIONS.CURRENT_LANGUAGE:
                return state;
            case ACTIONS.CURRENT_NOTE:
                return state;
            case ACTIONS.CHANGE_CURRENT_LANGUAGE:
                state.currentLanguage = action.payload.language.toLowerCase();
                state.currentNote = {
                    noteTitle: undefined,
                    noteDescription: undefined,
                    noteDetails: undefined,
                    noteID: undefined,
                }
            
                return { ...state }
            case ACTIONS.CHANGE_CURRENT_NOTE:
                state.activeDropMenu = false; //close the drop in case it is active
                state.currentNote = {
                    noteTitle: action.payload.title,
                    noteDescription: action.payload.description,
                    noteDetail: action.payload.detail,
                    id: action.payload.id
                }
                return { ...state };
            case ACTIONS.TOGGLE_ADD_LANGUAGE_POPUP:
                return {
                    ...state,
                    activeAddLanguage: !state.activeAddLanguage
                }
            
            case ACTIONS.TOGGLE_DELETE_LANGUAGE_POPUP:
                return {
                    ...state,
                    activeDeleteLanguage: !state.activeDeleteLanguage
                }
            case ACTIONS.TOGGLE_ADD_NOTE_POPUP:
                return {
                    ...state,
                    activeAddNotePopUp: !state.activeAddNotePopUp
                }
            default:
                return;
        }
    };

    const [state, dispatch] = useReducer(reducer, {
        currentLanguage: undefined,
        currentLanguages: [],
        currentNotes: [],
        currentNote: {
            noteTitle: undefined,
            noteDescription: undefined,
            noteDetails: undefined,
            noteID: undefined,
        },
        showSpinner: { isShowing: false, spinnerMessage: undefined },
        showInputResponse: {
            isErrorInput: false,
            errorType: undefined,
            message: undefined,
        },
        activeDropMenu: false,
        activeAddLanguage: false,
        activeDeletelanguage: false,
        activeAddNotePopUp: false,
        callDispatch: (action) => {
            dispatch(action);
        },
        fetchLanguages: async () => {
            dispatch({ type: ACTIONS.SHOW_SPINNER, payload: { message: "Loading Languages" } });
            const response = await fetch(
                "https://frequentquestions.herokuapp.com/languages/"
            );
            const data = await response.json();
            dispatch({ type: ACTIONS.FETCH_LANGUAGES, payload: { d: data.reverse() } });
            dispatch({ type: ACTIONS.HIDE_SPINNER, payload: { message: "Loading Languages" } });
        },
        fetchNotes: async (language) => {
            language = language.toLowerCase();
            dispatch({ type: ACTIONS.SHOW_SPINNER, payload: { message: "Loading Notes" } });
            const response = await fetch(`https://frequentquestions.herokuapp.com/languages/${language}/getNotes`)
            const data = await response.json();
            dispatch({ type: ACTIONS.FETCH_NOTES, payload: { notes: data.reverse() } });
            dispatch({ type: ACTIONS.HIDE_SPINNER, payload: { message: "Loading Notes" } });
    },
      saveNote: async (language, note) => {
          dispatch({ type: ACTIONS.SHOW_SPINNER, payload: { message: "Saving Note" } });
          const response = await fetch(`https://frequentquestions.herokuapp.com/languages/${language.toLowerCase()}/updateNote`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note),
        })
          const data = await response;
        //   dispatch({ type: ACTIONS.CHANGE_CURRENT_NOTE, payload: { title: note.title, description:note.description, detail:note.noteDetail, id:note.noteId } })
        dispatch({ type: ACTIONS.HIDE_SPINNER, payload:{message: "Saving Note"} });

        if (response.ok) {
            dispatch({type: ACTIONS.SHOW_INPUT_RESPONSE, payload: {isErrorInput: true,errorType: 'positive',message: 'Note was Successfully Saved',}})
            // curr.manageBottomMessage(true, "positive", `Note was Successfully Deleted`);
            setTimeout(() => { 
                dispatch({type: ACTIONS.SHOW_INPUT_RESPONSE, payload: {isErrorInput: false,errorType: 'positive',message: 'Note was Successfully Saved',}})
            }, 2000)
            // document.querySelector(".selected").click();
        }
        else {
            dispatch({type: ACTIONS.SHOW_INPUT_RESPONSE, payload: {isErrorInput: true,errorType: 'negative',message: 'Problem Saving Note',}})
            // curr.manageBottomMessage(true, "positive", `Note was Successfully Deleted`);
            setTimeout(() => { 
                dispatch({type: ACTIONS.SHOW_INPUT_RESPONSE, payload: {isErrorInput: false,errorType: 'negative',message: 'Problem Saving Note',}})
            }, 2000)
        }
    },
      deleteNote: async (language, note) => {
        const response = await fetch(`https://frequentquestions.herokuapp.com/languages/${language.toLowerCase()}/deleteNote`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note),
        })
          const data = await response;
          
          if (response.ok) {
            dispatch({type: ACTIONS.SHOW_INPUT_RESPONSE, payload: {isErrorInput: true,errorType: 'positive',message: 'Note Successfully Deleted',}})
            // curr.manageBottomMessage(true, "positive", `Note was Successfully Deleted`);
            setTimeout(() => { 
                dispatch({type: ACTIONS.SHOW_INPUT_RESPONSE, payload: {isErrorInput: false,errorType: 'negative',message: 'Note Successfully Deleted',}})
            }, 2000)
            document.querySelector('.selected').click();
        }
        else {
            dispatch({type: ACTIONS.SHOW_INPUT_RESPONSE, payload: {isErrorInput: true,errorType: 'positive',message: 'Error While Deleting Note',}})
            // curr.manageBottomMessage(true, "positive", `Note was Successfully Deleted`);
            setTimeout(() => { 
                dispatch({type: ACTIONS.SHOW_INPUT_RESPONSE, payload: {isErrorInput: false,errorType: 'negative',message: 'Error While Deleting Note',}})
            }, 2000)
        }
    }, 
      addLanguage: async (language) => {
        dispatch({ type: ACTIONS.SHOW_SPINNER, payload: { message: "Adding Language" } });
        const response = await fetch(`https://frequentquestions.herokuapp.com/languages/${language}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
          const data = await response;
          dispatch({ type: ACTIONS.HIDE_SPINNER, payload:{message: "Adding Language"} });
        if (response.ok) {
            dispatch({type: ACTIONS.SHOW_INPUT_RESPONSE, payload: {isErrorInput: true,errorType: 'positive',message: 'Language Successfully Added',}})
            setTimeout(() => { 
                dispatch({type: ACTIONS.SHOW_INPUT_RESPONSE, payload: {isErrorInput: false,errorType: 'positive',message: 'Note Successfully Deleted',}})
            }, 2000)
            state.fetchLanguages();
            dispatch({ type: ACTIONS.TOGGLE_ADD_LANGUAGE_POPUP });
        }
        else {
            dispatch({type: ACTIONS.SHOW_INPUT_RESPONSE, payload: {isErrorInput: true,errorType: 'negative',message: `${language} Already Exists`}})
            setTimeout(() => { 
                dispatch({type: ACTIONS.SHOW_INPUT_RESPONSE, payload: {isErrorInput: false,errorType: 'negative',message: `${language} Already Exists`}})
            },2000)
        }
      },
      deleteLanguage: async (language) => {
          dispatch({ type: ACTIONS.SHOW_SPINNER, payload: { message: "Deleting Language" } });
          const response = await fetch(` https://frequentquestions.herokuapp.com/languages/${language.toLowerCase()}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
          const data = await response;
          dispatch({ type: ACTIONS.HIDE_SPINNER, payload: { message: "Deleting Language" } });

          if (response.ok) {
            dispatch({type: ACTIONS.SHOW_INPUT_RESPONSE, payload: {isErrorInput: true,errorType: 'positive',message: 'Language Successfully Deleted',}})
              dispatch({ type: ACTIONS.TOGGLE_DELETE_LANGUAGE_POPUP });
            setTimeout(() => { 
                dispatch({type: ACTIONS.SHOW_INPUT_RESPONSE, payload: {isErrorInput: false,errorType: 'positive',message: 'Language Successfully Deleted',}})
            }, 2000)
              state.fetchLanguages();
              
        }
        else {
              dispatch({ type: ACTIONS.SHOW_INPUT_RESPONSE, payload: { isErrorInput: true, errorType: 'negative', message: `${language} does not exist`, } });
            setTimeout(() => { 
                dispatch({ type: ACTIONS.SHOW_INPUT_RESPONSE, payload: { isErrorInput: false, errorType: 'negative', message: `${language} does not exist`, } });
            },2000)
        }
      },
      addNote: async(language, note)=>{
          dispatch({ type: ACTIONS.SHOW_SPINNER, payload: { message: "Adding Note" } });
          const response = await fetch(`https://frequentquestions.herokuapp.com/languages/${language}/newNote`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note),
          })
          const data = await response;
          dispatch({ type: ACTIONS.HIDE_SPINNER, payload: { message: "Adding Note" } });
          if (response.ok) {
            dispatch({type: ACTIONS.SHOW_INPUT_RESPONSE, payload: {isErrorInput: true,errorType: 'positive',message: 'Note Successfully Added',}})
            setTimeout(() => { 
                dispatch({type: ACTIONS.SHOW_INPUT_RESPONSE, payload: {isErrorInput: false,errorType: 'positive',message: 'Note Successfully Added',}})
            }, 2000)
              dispatch({ type: ACTIONS.TOGGLE_ADD_NOTE_POPUP });
              document.querySelector('.selected').click();
        }
          else {
            dispatch({type: ACTIONS.SHOW_INPUT_RESPONSE, payload: {isErrorInput: true,errorType: 'positive',message: 'Note With That Title Already Exists',}})
            setTimeout(() => { 
                dispatch({type: ACTIONS.SHOW_INPUT_RESPONSE, payload: {isErrorInput: false,errorType: 'positive',message: 'Note With That Title Already Exists',}})
            },2000)
        }
      }
  });

  return (
    <AppProvider.Provider value={state}>
      {state.showSpinner.isShowing === true && (
        <Message message={state.showSpinner.spinnerMessage} />
      )}
        {props.children}
        {state.activeAddLanguage && <AddLanguagePopUp />}
        {state.activeDeleteLanguage && <DeleteLanguagePopUp />}
        <InputError messageType={state.showInputResponse.errorType} errorMessage={state.showInputResponse.message} className={state.showInputResponse.isErrorInput === true ? "active" : ""} />
        {state.activeAddNotePopUp && <AddNotePopUp/>}
    </AppProvider.Provider>

  );
};

export default AppContext;
export { ACTIONS };
