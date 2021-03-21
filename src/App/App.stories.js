import { MemoryRouter } from 'react-router-dom'
import App from './App'

export default {
  title: 'Full Application/App',
  components: App,
}

export const FullApplication = () => (
  <MemoryRouter>
    <App />
  </MemoryRouter>
)
