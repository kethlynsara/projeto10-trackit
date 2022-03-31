import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react/cjs/react.development";

import Login from "../Login";
import Cadastro from "../Cadastro";
import Habitos from "../Habitos";
import Hoje from "../Hoje";
import Historico from "../Historico";
import UserContext from "../../contexts/UserContext";

import "../../assets/css/reset.css";


function App() {
    const [token, setToken] = useState("");
    const [img, setImg] = useState("");
    return (
        <UserContext.Provider value={{token, setToken, img, setImg}}>
            <BrowserRouter>
                <main>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/cadastro" element={<Cadastro />} />
                        <Route path="/habitos" element={<Habitos />} />
                        <Route path="/hoje" element={<Hoje />} />
                        <Route path="/historico" element={<Historico />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </UserContext.Provider>
    )
}

export default App;

