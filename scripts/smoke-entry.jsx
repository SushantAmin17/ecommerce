import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { StoreProvider } from '../src/context/StoreContext.jsx'
import App from '../src/App.jsx'

// Renders <App/> at each route and returns output length (throws on runtime errors).
export function renderAll(routes) {
  return routes.map((r) => {
    const html = renderToString(
      <MemoryRouter initialEntries={[r]}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </MemoryRouter>,
    )
    return { route: r, len: html.length }
  })
}
