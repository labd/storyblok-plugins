import { createRoot } from 'react-dom/client'
import App from './App'
import { createRootElement } from './createRootElement'
import './style.css'

const rootNode = createRootElement()
document.body.appendChild(rootNode)

createRoot(rootNode).render(<App />)
