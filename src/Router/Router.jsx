
import LoginPage from "@/components/Auth/Authentication/LoginPage";
import RegisterPage from "@/components/Auth/Authentication/RegisterPage";
import GalleryDetails from "@/components/DetailsPages/GalleryDetails";
import NewsEventDetails from "@/components/DetailsPages/NewsEventDetails";
import ShopDetails from "@/components/DetailsPages/ShopDetails";
import NotFound from "@/components/Error/NotFound";
import Dashboard from "@/DashboardPages/Dashboard";
import EventIssueUpload from "@/DashboardPages/EventIssueUpload";
import LatestEventsForm from "@/DashboardPages/LatestEventsForm";
import ManageUsers from "@/DashboardPages/ManageUsers";
import MembershipForm from "@/DashboardPages/MembershipForm";
import NewIssuePage from "@/DashboardPages/NewIssuePage";
import ProductListing from "@/DashboardPages/ProductListing";
import UploadGalleryForm from "@/DashboardPages/UploadGalleryForm";
import DashboardLayOut from "@/LayOut/DashboardLayOut";
import MainLayOut from "@/LayOut/MainLayOut";
import AboutPage from "@/Pages/AboutPage";
import BDPostIssue from "@/Pages/BDPostIssue";
import GalleryPage from "@/Pages/GalleryPage";
import HomePage from "@/Pages/HomePage";
import MemberShipPage from "@/Pages/MemberShipPage";
import NewsPage from "@/Pages/NewsPage";
import ShopPage from "@/Pages/ShopPage";

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
                path: "/news/:id",
                element: <NewsEventDetails/>
            },
            {
                path: "/gallery",
                element: <GalleryPage/>
            },
            {
                path: "/gallery/:id",
                element: <GalleryDetails/>
            },
            {
                path: "/about",
                element: <AboutPage/>
            },
            {
                path: "/bnpa-50/bd-issue",
                element: <BDPostIssue/>
            },
            {
                path: "/members",
                element: <MemberShipPage/>
            },
            {
                path: "/shop",
                element: <ShopPage/>
            },
            {
                path: "/shop/:id",
                element: <ShopDetails/>
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
                path: "upload-gallery",
                element: <UploadGalleryForm/>
            },
            {
                path: "membership",
                element: <MembershipForm/>
            },
            {
                path: "new-issue",
                element: <NewIssuePage/>
            },
            {
                path: "events-issue",
                element: <EventIssueUpload/>
            },
            {
                path: "latest-events-form",
                element: <LatestEventsForm/>
            },
            {
                path: "Product-Listing",
                element: <ProductListing/>
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