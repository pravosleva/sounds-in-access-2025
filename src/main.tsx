import React from 'react'
import { HomePage, SoundsPage, TemplatePage, ProjectPage, RandomizersPage } from './pages'
import { HashRouter, Link, Route, Routes } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
// import './App.module.scss'
import './index.css'
import { LocalStorageInspectorContext } from './common/context'
import { ErrorBoundary } from 'react-error-boundary'
import { Alert } from '~/common/components'

function FallbackRender({ error }: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  return (
    <div
      className='p-4'
    >
      <Alert
        type='danger'
        header='ERROR'
      >
        <pre>{error.message}</pre>
      </Alert>
    </div>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LocalStorageInspectorContext>
      <ErrorBoundary
        fallbackRender={FallbackRender}
        onReset={(details) => {
          // Reset the state of your app so the error doesn't happen again
        }}
      >
        {/* @ts-ignore */}
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sounds" element={<SoundsPage />} />
            <Route path="/sounds/:project" element={<ProjectPage />} />
            <Route path="/randomizers" element={<RandomizersPage />} />
            <Route path="/template" element={<TemplatePage />} />
            <Route
              path="/about"
              element={
                <>
                  <div className="text-center">
                    <h1 className="text-xl">About</h1>
                    <div>
                      <Link to="/" className="text-purple-400 underline">
                        Home
                      </Link>
                    </div>
                  </div>
                </>
              }
            />
          </Routes>
        </HashRouter>
      </ErrorBoundary>
    </LocalStorageInspectorContext>
  </React.StrictMode>
)
