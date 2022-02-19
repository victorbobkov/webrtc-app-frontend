import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import { useEffect } from 'react'
import { connectWithWebSocket } from './utils/wssConnection'
import Dashboard from './dashboard/Dashboard'
import LoginPage from './loginPage/LoginPage'

function App() {
    useEffect(() => {
        connectWithWebSocket()
    }, [])

    return (
       <Router>
           <Switch>
               <Route path="/dashboard" component={ Dashboard } />
               <Route path="/" component={ LoginPage } />
           </Switch>
       </Router>
    )
}

export default App
