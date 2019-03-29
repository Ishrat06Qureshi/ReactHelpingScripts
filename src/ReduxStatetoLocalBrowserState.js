// when we refresh the page the redux store losses its state and will get assign
// back to their initial state so in order to keep the state the persist 
// we can follow several techniques
// 1 hot reloading in reducers
// 2 use of local Storage


// With use of local Storage

    
import { createStore, combineReducers } from 'redux'


function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch(e) {
    console.log(e)
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch(e) {
    console.log(e)
    return undefined
  }
}

const rootReducer = combineReducers({
  list: listReducer,
})

const persistedState = loadFromLocalStorage()

const store = createStore(
  rootReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store