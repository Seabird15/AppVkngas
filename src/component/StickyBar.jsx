import { BiHome, BiMessageAltDetail, BiBarChart } from "react-icons/bi";

export const StickyBar = () => {
    return (
        //Barra menú sticky mobil
        <>
            <div className="sticky bottom-0 z-50 w-full py-3 bg-cyan-100 md:hidden">
                <div className="flex justify-center gap-5 btns">
                    <div className="">
                        <a href="" className="">
                            <BiHome className="w-auto h-8" /></a></div>
                    <div className="">
                        <a href="">
                            <BiBarChart className="w-auto h-8" /></a></div>
                    <div className="">
                        <a href="" className="">
                            <BiMessageAltDetail className="w-auto h-8 px-2" /></a></div>
                </div>
            </div>
        </>
    )
}
