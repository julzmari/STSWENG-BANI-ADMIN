import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export function Root () {
    return (
        <div >
            
              <Navbar/>  
            
            <div className="mr-[15px] ml-[15px]">
                <Outlet/>
            </div>
        </div>
    )
}