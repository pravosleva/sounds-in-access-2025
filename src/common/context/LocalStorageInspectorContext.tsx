import { useEffect, useLayoutEffect, useRef } from 'react'
import { createFastContext } from './utils'
import { EProject } from '~/common/vi/types'
import { subscribe } from 'valtio'
import { vi } from '~/common/vi'

type TPICFilters = {
  isAnyFilterActive: boolean;
  projectFilter: boolean;
  values: {
    projectFilter: null | EProject;
  },
};
type TPICStore = {
  activeFilters: TPICFilters;
}

const initialState: TPICStore = {
  activeFilters: {
    projectFilter: false,
    isAnyFilterActive: false,
    values: {
      projectFilter: null,
    },
  },
}

const _LocalStorageInspectorContext = createFastContext<TPICStore>(initialState)

const { Provider, useStore } = _LocalStorageInspectorContext

type TProps = {
  children: React.ReactNode;
}

const Logic = ({ children }: TProps) => {
  const rendersRef = useRef(0)
  // -- NOTE: Persist todos
  // NOTE: See also xstate sample: _
  useEffect(() => subscribe(vi.localRandomizers, () => {
    if (rendersRef.current > 0)
      localStorage.setItem('sounds', JSON.stringify(vi.localRandomizers))
  }), [])
  useLayoutEffect(() => {
    rendersRef.current += 1
  })
  // --

  return (
    <>
      {children}
    </>
  )
}

export const LocalStorageInspectorContext = ({ children }: TProps) => {
  return (
    <Provider>
      <Logic>
        {children}
      </Logic>
    </Provider>
  )
}

// export const useLocalStorageInspectorContextStore = useStore
