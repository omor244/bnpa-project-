

import Swal from "sweetalert2";




// - Home, About BNPA, News & Event, BNPA 50 Years, Members, Gallery, Contact, SHOP

 export const navLinks = [
    { name: "Home", href: "/" },
    {
        name: "About BNPA",
        href: "/about",
    },
    { name: "News & Events", href: "/news" },
     { name: "BNPA 50 Years", href: "/BNPA-50-Years" },
    { name: "Members", href: "/members" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
     { name: "Shop", href: "/SHOP" },
];



export const committee = {
    leadership: [
        { name: "Arshad Bhuiyan", role: "President", img: "https://bassa.net.au/wp-content/uploads/2021/11/Bhuiyan.png" },
        { name: "Mohammed Monirul Islam", role: "Vice President", img: "https://bassa.net.au/wp-content/uploads/2021/11/Monir.png" },
    ],
    members: [
        { name: "Md Mostafa Kamal (Swadhin)", role: "General Secretary", img: "https://bassa.net.au/wp-content/uploads/2021/11/Md-Mostafa-Kamal-Swadhin.png" },
        { name: "Mr. Rasel Ahmed", role: "Assistant General Secretary", img: "https://bassa.net.au/wp-content/uploads/2024/11/Rasel-10.jpg" },
        { name: "Kazi Hoque", role: "Assistant Treasurer", img: "https://bassa.net.au/wp-content/uploads/2021/11/Kazi-Haque.png" },
        { name: "Ms. Ireen Chaudhury", role: "Cultural Secretary", img: "https://bassa.net.au/wp-content/uploads/2024/11/Ireen-11.jpg" },
        { name: "Sharmin Ara Milki", role: "Assistant Cultural Secretary", img: "https://bassa.net.au/wp-content/uploads/2021/11/Sharmin-Ara-Milki.png" },
        { name: "Khandaker Hasanuzzaman", role: "Office and Media Secretary", img: "https://bassa.net.au/wp-content/uploads/2021/11/Khandaker-Hasanuzzaman.png" },
        { name: "AKM Mahbub Alam", role: "Executive Member", img: "https://bassa.net.au/wp-content/uploads/2021/11/AKM-Mahbub-Alam.png" },
        { name: "Md. Saifur Rahman", role: "Executive Member", img: "https://bassa.net.au/wp-content/uploads/2024/11/Saifur-Islam-10.jpg" },
        { name: "Mrs. Jakiya Jisha", role: "Executive Member", img: "https://bassa.net.au/wp-content/uploads/2024/11/jakiya-10.jpg" },
    ]
};

export const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});








