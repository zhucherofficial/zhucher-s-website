import { useLocation } from 'react-router-dom'
import { PortfolioScene } from '../components/PortfolioScene'

export function HomePage() {
  const location = useLocation()
  return (
    <PortfolioScene
      initialView={location.state?.openScene}
      returnFocusId={location.state?.returnFocusId}
    />
  )
}
