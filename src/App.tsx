import { Suspense, lazy } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'
import { UI_STYLE } from './config'
import type { UiStyle } from './config'

// Each style is a separate chunk, so only the selected one is downloaded.
const STYLES: Record<UiStyle, LazyExoticComponent<ComponentType>> = {
  console: lazy(() => import('./ui/console')),
  editorial: lazy(() => import('./ui/editorial')),
  bento: lazy(() => import('./ui/bento')),
  blueprint: lazy(() => import('./ui/blueprint')),
  ide: lazy(() => import('./ui/ide')),
}

export default function App() {
  const ActiveUi = STYLES[UI_STYLE]

  return (
    <Suspense fallback={null}>
      <ActiveUi />
    </Suspense>
  )
}
