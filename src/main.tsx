import ReactDOM from 'react-dom/client'
import Router from "@/route"
import AppContext from '@/contexts'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AppContext>
      <Router />
    </AppContext>
)
