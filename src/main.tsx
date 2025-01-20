import React from 'react'
import { HomePage, SoundsPage, TemplatePage, ProjectPage } from './pages'
import { HashRouter, Link, Route, Routes } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
// import './App.module.scss'
import './index.css'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* @ts-ignore */}
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sounds" element={<SoundsPage />} />
        <Route path="/sounds/:project" element={<ProjectPage />} />
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
  </React.StrictMode>
)
