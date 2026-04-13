import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Outlet } from "react-router";


const MainLayOut = () => {
    return (
        <div>
            <header className="sticky top-0 z-50">
                <Navbar/>
            </header>
            <main>
                <Outlet/>
            </main>
            <div>
                <Footer/>
           </div>
        </div>
    );
};

export default MainLayOut;