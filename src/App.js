import './App.css'
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import { useEffect } from "react"
import { connectWithWebSocket } from "./utils/wss-connection/wssConnection"
import Dashboard from "./dashboard/Dashboard";
import LoginPage from "./loginPage/LoginPage";

function App() {

    useEffect(() => {
        connectWithWebSocket()
    },[])

    return (
        <BrowserRouter>
            <Switch>
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/' component={LoginPage} />
            </Switch>
        </BrowserRouter>
    )
}

export default App
