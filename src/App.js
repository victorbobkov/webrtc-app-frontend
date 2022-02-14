import './App.css'
import { useEffect } from "react";
import { connectWithWebSocket } from "./utils/wss-connection/wssConnection";

function App() {

    useEffect(() => {
        connectWithWebSocket()
    },[])

    return (
        <div className="App">
            App
        </div>
    )
}

export default App
