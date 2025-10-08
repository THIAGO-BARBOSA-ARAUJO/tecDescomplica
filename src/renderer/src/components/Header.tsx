import { useNavigate } from "react-router-dom";
import Logo from "../assets/img/logoTecEduca.png"

export function Header() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex justify-between
             items-center bg-[#1565C0] min-h-[80px]">
                <img className="cursor-pointer" onClick={() => navigate('/')} src={Logo} alt="imagem de logo" />
            </div>
        </div>
    )
}