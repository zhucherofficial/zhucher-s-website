import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PortfolioScene } from '../components/PortfolioScene'

export function HomePage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [initialSceneState] = useState(() => location.state)

  useEffect(() => {
    if (!initialSceneState?.openScene && !initialSceneState?.returnFocusId) return

    navigate(
      {
        pathname: location.pathname,
        search: location.search,
        hash: location.hash,
      },
      { replace: true, state: null },
    )
  }, [initialSceneState, location.hash, location.pathname, location.search, navigate])

  return (
    <PortfolioScene
      initialView={initialSceneState?.openScene}
      returnFocusId={initialSceneState?.returnFocusId}
    />
  )
}
