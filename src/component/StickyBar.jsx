import { BiHome, BiMessageAltDetail, BiBarChart } from "react-icons/bi";
import { Link } from "react-router-dom";

export const StickyBar = () => {
    return (
        // Barra menú sticky mobile
        <div className="sticky bottom-0 z-50 w-full py-3 bg-cyan-100 md:hidden">
            <div className="flex justify-center gap-5 btns">
                <div>
                    <Link to="/" className="">
                        <BiHome className="w-auto h-8" />
                    </Link>
                </div>
                <div>
                    <Link to="encuesta">
                        <BiBarChart className="w-auto h-8" />
                    </Link>
                </div>
                <div>
                    <Link to="/wall" className="">
                        <BiMessageAltDetail className="w-auto h-8 px-2" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
