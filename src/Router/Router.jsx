
import CheckoutAsGuest from "@/components/AddToCart/Checkout/CheckoutAsGuest";
import CheckoutPage from "@/components/AddToCart/Checkout/CheckoutPage";
import LoginPage from "@/components/Auth/Authentication/LoginPage";
import RegisterPage from "@/components/Auth/Authentication/RegisterPage";
import GalleryDetails from "@/components/DetailsPages/GalleryDetails";
import NewsEventDetails from "@/components/DetailsPages/NewsEventDetails";
import ShopDetails from "@/components/DetailsPages/ShopDetails";
import NotFound from "@/components/Error/NotFound";
import AdminRole from "@/components/Hooks/AdminRole";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import EventIssueUpload from "@/DashboardComponets/EventIssue/EventIssueUpload";
import LatestEventsForm from "@/DashboardComponets/LatestEventsForm/LatestEventsForm";
import NewIssueForm from "@/DashboardComponets/NewIssue/NewIssueForm";
import ProductListingForm from "@/DashboardComponets/ProductListring/ProductLisingForm";
import UploadGalleryForm from "@/DashboardComponets/UploadGallery/UploadGalleryForm";
import Dashboard from "@/DashboardPages/Dashboard";
import EventIssuePage from "@/DashboardPages/EventIssuePage";
import LatestEventsPage from "@/DashboardPages/LatestEventsPage";
import ManageMembers from "@/DashboardPages/ManageMembers";
import ManageUsers from "@/DashboardPages/ManageUsers";
import MembershipForm from "@/DashboardPages/MembershipForm";
import NewIssuePage from "@/DashboardPages/NewIssuePage";
import ProductListingPage from "@/DashboardPages/ProductListingPage";
import UploadGalleryPage from "@/DashboardPages/UploadGalleryPage";
import DashboardLayOut from "@/LayOut/DashboardLayOut";
import MainLayOut from "@/LayOut/MainLayOut";
import PrivateRoute from "@/LayOut/PrivateRoute/PrivateRoute";
import AboutPage from "@/Pages/AboutPage";
import AddToCart from "@/Pages/AddToCart";
import BDPostIssue from "@/Pages/BDPostIssue";
import ContactPage from "@/Pages/ContactPage";
import GalleryPage from "@/Pages/GalleryPage";
import HomePage from "@/Pages/HomePage";
import MemberShipPage from "@/Pages/MemberShipPage";
import NewsPage from "@/Pages/NewsPage";
import ShopPage from "@/Pages/ShopPage";
import axios from "axios";

import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayOut />,
        errorElement: <NotFound />,
        hydrateFallbackElement: <LoadingPage/>,
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
            {
                path: "/cart",
                element: <AddToCart/>
            },
            {
                path: "/contact",
                element: <ContactPage/>
            },
            {
                path: "/shop-cart/checkout",
                element: <CheckoutPage />,
                loader: () => fetch("https://restcountries.com/v3.1/all?fields=name")
            },
            {
                path: "/shop-cart/checkout/guest",
                element: <CheckoutAsGuest />,
                loader: () => fetch("https://restcountries.com/v3.1/all?fields=name")
            }

        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute> <DashboardLayOut /></PrivateRoute> ,
        children: [
            {
                index: true,
                element: <Dashboard/>
            },
            {
                path: "manage-users",
                element: <AdminRole><ManageUsers /></AdminRole>
            },
            {
                path: "upload-gallery",
                element: <AdminRole><UploadGalleryPage /></AdminRole> 
            },
            {
                path: "upload-gallery-form",
                element: <AdminRole> <UploadGalleryForm /></AdminRole> 
            },
            {
                path: "membership",
                element: <MembershipForm/>
            },
            {
                path: "new-issue",
                element: <AdminRole> <NewIssuePage /></AdminRole> 
            },
            {
                path: "new-issue/new-issue-form",
                element: <AdminRole><NewIssueForm /></AdminRole>  
            },
            {
                path: "events-issue",
                element: <AdminRole><EventIssuePage /></AdminRole>  
            },
            {
                path: "events-issue/events-issue-form",
                element: <AdminRole><EventIssueUpload /></AdminRole>  
            },
            {
                path: "latest-events-manage",
                element: <AdminRole><LatestEventsPage /></AdminRole>  
            },
            {
                path: "latest-events-manage/latest-events-form",
                element: <AdminRole><LatestEventsForm /></AdminRole>  
            },
            {
                path: "Product-Listing",
                element: <AdminRole><ProductListingPage /></AdminRole>  
            },
            {
                path: "Product-uploading",
                element: <AdminRole><ProductListingForm /></AdminRole> 
            },
            {
                path: "manage-members",
                element: <AdminRole><ManageMembers /></AdminRole> 
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