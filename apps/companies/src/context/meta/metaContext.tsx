import * as React from "react";

interface MetaContextType {
  title: string;
}

interface MetaContextActionType {
  type: "SET_METADATA";
  payload: {
    title: string;
  };
}
const defaultMetaContextValue = {
  title: "EsayTravel",
};

const MetaContext = React.createContext<MetaContextType>(
  defaultMetaContextValue
);
export const MetaDispatchContext =
  React.createContext<React.Dispatch<MetaContextActionType> | null>(null);

export function MetaContextProvider({ children }: React.PropsWithChildren<{}>) {
  const [appData, dispatch] = React.useReducer(
    appReducer,
    defaultMetaContextValue
  );
  return (
    <MetaContext.Provider value={appData}>
      <MetaDispatchContext.Provider value={dispatch}>
        {children}
      </MetaDispatchContext.Provider>
    </MetaContext.Provider>
  );
}

function appReducer(state: MetaContextType, action: MetaContextActionType) {
  switch (action.type) {
    case "SET_METADATA":
      return {
        ...state,
        title: action.payload.title,
      };
    default:
      return state;
  }
}

export const useMetaContext = () => React.useContext(MetaContext);
export const useMetaDispatchContext = () =>
  React.useContext(MetaDispatchContext);
