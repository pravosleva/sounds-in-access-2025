// import { useEffect } from 'react'
import { createFastContext } from './utils'
import { EProject } from '~/common/vi/types'
// import { subscribe } from 'valtio'
// import { vi } from '~/common/vi'

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

const _ParamsInspectorContext = createFastContext<TPICStore>(initialState)

const { Provider, useStore } = _ParamsInspectorContext

type TProps = {
  children: React.ReactNode;
}

const Logic = ({ children }: TProps) => {
  
  return (
    <>
      {children}
    </>
  )
}

export const ParamsInspectorContext = ({ children }: TProps) => {
  return (
    <Provider>
      <Logic>
        {children}
      </Logic>
    </Provider>
  )
}

export const useParamsInspectorContextStore = useStore
