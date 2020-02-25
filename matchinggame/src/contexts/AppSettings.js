import React, { useState } from "react";
import { animals } from "../media/animals";
import getCurrentDimensions from "../utils/getCurrentDimensions";

export const AppSettings = React.createContext();

const initState = {
  dimensions: getCurrentDimensions(),
  images: animals,
  navBarVisible: true
};

function AppSettingsProvider(props) {
  const [settingsState, settingsDispatch] = useState(initState);

  const actions = {
    updateDimensions: () => settingsDispatch({
      ...settingsState,
      dimensions: getCurrentDimensions()
    }),
    setImages: data => settingsDispatch({
      ...settingsState,
      images: data
    }),
    toggleNavBarVisible: () => settingsDispatch({
      ...settingsState,
      navBarVisible: !settingsState.navBarVisible
    })
  }

  return (
    <AppSettings.Provider value={{...settingsState, ...actions}}>
      {props.children}
    </AppSettings.Provider>
  )
}

export default AppSettingsProvider