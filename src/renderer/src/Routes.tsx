import { Router, Route } from "electron-router-dom";

import { Home } from "./pages/Home";
import { EditStudent } from "./pages/EditStudent";

export function Routes(){
    return (
        <Router
            main={
                <>
                    <Route path='/' element={<Home/>} />
                    <Route path='/editstudent' element={<EditStudent/>} />
                </>
            }
        />
    )
}