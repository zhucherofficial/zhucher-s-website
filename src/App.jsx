import { lazy, Suspense } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { ScrollManager } from './components/ScrollManager'
import { SiteHeader } from './components/SiteHeader'
import { ClubDetailPage } from './pages/ClubDetailPage'
import { ExperiencePage } from './pages/ExperiencePage'
import { HomePage } from './pages/HomePage'
import { ServiceDetailPage } from './pages/ServiceDetailPage'

const LabPage = lazy(() => import('./pages/LabPage').then((module) => ({ default: module.LabPage })))
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage').then((module) => ({ default: module.ProjectDetailPage })))

export default function App() {
  const { pathname } = useLocation()
  const sceneRoute = pathname === '/' || pathname === '/lab' || pathname.startsWith('/projects/')

  return (
    <>
      <ScrollManager />
      {!sceneRoute ? <SiteHeader /> : null}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/projects/:id" element={<Suspense fallback={<main className="route-loading">LOADING_PROJECT...</main>}><ProjectDetailPage /></Suspense>} />
        <Route path="/club/:id" element={<ClubDetailPage />} />
        <Route path="/service/:id" element={<ServiceDetailPage />} />
        <Route path="/physics-club" element={<ClubDetailPage />} />
        <Route path="/physics-education" element={<ServiceDetailPage />} />
        <Route path="/lab" element={<Suspense fallback={<main className="route-loading">LOADING_PHYSICS_LAB...</main>}><LabPage /></Suspense>} />
        <Route path="/club/physics-club" element={<Navigate to="/physics-club" replace />} />
        <Route path="/service/physics-education" element={<Navigate to="/physics-education" replace />} />
        <Route path="*" element={<main className="not-found-page"><span>404</span><h1>THIS EXPERIMENT IS NOT ON THE BENCH.</h1><Link to="/">RETURN_HOME</Link></main>} />
      </Routes>
    </>
  )
}
