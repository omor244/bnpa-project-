
import LoginPage from "@/components/Auth/Authentication/LoginPage";
import RegisterPage from "@/components/Auth/Authentication/RegisterPage";
import NotFound from "@/components/Error/NotFound";
import Dashboard from "@/DashboardPages/Dashboard";
import ManageUsers from "@/DashboardPages/ManageUsers";
import MembershipForm from "@/DashboardPages/MembershipForm";
import NewIssuePage from "@/DashboardPages/NewIssuePage";
import DashboardLayOut from "@/LayOut/DashboardLayOut";
import MainLayOut from "@/LayOut/MainLayOut";
import AboutPage from "@/Pages/AboutPage";
import HomePage from "@/Pages/HomePage";
import NewsPage from "@/Pages/NewsPage";

import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayOut />,
        errorElement: <NotFound/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: "/news",
                element: <NewsPage/>
            },
            {
                path: "/about",
                element: <AboutPage/>
            },
        ]
    },
    {
        path: "/dashboard",
        element: <DashboardLayOut />,
        children: [
            {
                index: true,
                element: <Dashboard/>
            },
            {
                path: "manage-users",
                element: <ManageUsers/>
            },
            {
                path: "membership",
                element: <MembershipForm/>
            },
            {
                path: "new-issue",
                element: <NewIssuePage/>
            },
        ] ,
    },
    {
        path: "/login",
        element: <LoginPage/>
    },
    {
        path: "/register",
        element: <RegisterPage/>
    },
]);