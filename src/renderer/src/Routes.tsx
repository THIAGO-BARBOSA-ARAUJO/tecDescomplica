import { Router, Route } from "electron-router-dom";

import { Home } from "./pages/Home";

export function Routes(){
    return (
        <Router
            main={
                <>
                    <Route path='/' element={<Home/>} />
                </>
            }
        />
    )
}