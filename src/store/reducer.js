import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import {
  
} from './actionTypes';

export const StoreContext = createContext();

const initialState = {
  
};

function reducer() {

}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
}

StoreProvider.propTypes = {
  children: PropTypes.object,
};
