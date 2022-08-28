import React, {createContext, memo, MutableRefObject, useContext, useEffect, useMemo, useRef, useState} from 'react';
import { WavesClass } from '../../classes/waves/Waves';

const StoredWavesScene = createContext<any>({})

const StoredGameSceneWrapper = ({ children }: { children: Array<React.ReactElement> | React.ReactElement }) => {
  const Waves: MutableRefObject<WavesClass | null> = useRef(null)
  return(
    <StoredWavesScene.Provider value={{Waves}}>
      {children}
    </StoredWavesScene.Provider>
  )
}

export const WavesScene = () => useContext(StoredWavesScene)

export default StoredGameSceneWrapper
