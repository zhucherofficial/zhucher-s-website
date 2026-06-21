import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { ScrollManager } from './components/ScrollManager'
import { SiteHeader } from './components/SiteHeader'
import { ClubDetailPage } from './pages/ClubDetailPage'
import { ExperiencePage } from './pages/ExperiencePage'
import { HomePage } from './pages/HomePage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import { ServiceDetailPage } from './pages/ServiceDetailPage'

export default function App() {
  const { pathname } = useLocation()

  return (
    <>
      <ScrollManager />
      <SiteHeader floating={pathname === '/'} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/club/:id" element={<ClubDetailPage />} />
        <Route path="/service/:id" element={<ServiceDetailPage />} />
      </Routes>
    </>
  )
}
