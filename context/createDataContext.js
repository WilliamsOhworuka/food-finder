import React, {createContext, useReducer} from 'react';

export default (reducer, actions, defaultValue) => {
  const Context = createContext();

  const Provider = ({children, moreState, moreActions}) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);
    moreState = moreState || {};
    moreActions = moreActions || {};

    const boundActions = {};

    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider
        value={{
          state: {...state, ...moreState},
          ...boundActions,
          ...moreActions,
        }}>
        {children}
      </Context.Provider>
    );
  };

  return {Context, Provider};
};
