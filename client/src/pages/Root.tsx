import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export function Root () {
    return (
        <>

                <Navbar/>


            <Outlet/>
        </>
    )
}