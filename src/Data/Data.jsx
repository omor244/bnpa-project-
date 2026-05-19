

import axios from "axios";
import Swal from "sweetalert2";





export const navLinks = [
    { name: "Home", href: "/" },
    { name: "About ", href: "/about" },
    { name: "News & Events", href: "/news" },
    {
        name: "BNPA 50 Years",
        href: "#", // Changed to '#' since it's a dropdown trigger
        subLinks: [
        
            { name: "Bangladesh post issue", href: "/bnpa-50/bd-issue" },
        ]
    },
    { name: "Members", href: "/members" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
    { name: "Shop", href: "/shop" },
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




export const handleAddToCart = async (items, user, queryClient) => {
    const getGuestId = () => {
        let guestId = localStorage.getItem('guest_cart_id');
        if (!guestId) {
            guestId = `guest_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
            localStorage.setItem('guest_cart_id', guestId);
        }
        return guestId;
    };

    const cartData = {
        addedAt: new Date().toLocaleDateString(),
        category: items?.category,
        con: items?.con,
        created_at: items?.created_at,
        description: items?.description,
        multipleimage: items?.multipleimage,
        photo: items?.photo,
        price: items?.price,
        title: items?.title,
        productId: items?.id || items?._id,
        customer_email: user?.email ? user.email : getGuestId(),
        is_guest: !user?.email
    };

    Swal.fire({
        title: "Add to Cart?",
        text: `Do you want to add "${items.title}" to your cart?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#26bba4",
        cancelButtonColor: "#ef4444",
        confirmButtonText: "Yes, add it!",
        cancelButtonText: "No, cancel"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const res = await axios.post("https://data.bnpa.bd/add-cart", cartData);

                if (res.data.success || res.status === 201) {
                    // --- THE FIX ---
                    // This forces the Navbar query to refetch the new count
                    if (queryClient) {
                        queryClient.invalidateQueries({ queryKey: ['cart-items-in-nav'] });
                    }

                    Swal.fire({
                        title: "Added!",
                        text: "Item has been added to your cart.",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false
                    });
                } else if (res.data.message === "Product already in cart") {
                    // Toast.fire logic...
                }
            } catch (error) {
                console.error("Cart error:", error);
                // Toast.fire error logic...
            }
        }
    });
};

const memberImage = "";



 export const committeeMembers = [
    // { role: "chief_patron", members: [], cols: "grid-cols-1" },
    {
        role: "advisory", members: [
            { name: "Prof. Dr. Kazi Shariful Alam", designation: "Chief Patron", image: "https://i.ibb.co.com/RTcTwdF9/Whats-App-Image-2026-04-27-at-4-47-52-PM.jpg" },
            { name: "Nasimul Islam", designation: "Advisory Member", image: memberImage },
            { name: "Kazi Wahidul Alam", designation: "Advisory Member", image: "" },
        ], cols: "grid-cols-3"
    },
    { role: "president", members: [{ name: "Prof. Dr. Abdullah Al Shafi Majumder", designation: "President", image: "https://i.ibb.co.com/yBfpbbLJ/Prof-Dr-Abdullah-Al-Shafi-Majumder.jpg" }], cols: "grid-cols-1" },
    {
        role: "vice_presidents", members: [
            { name: "Mohammed Monirul Islam", designation: "Vice President", image: "https://i.ibb.co.com/6LLkJgH/Whats-App-Image-2026-05-02-at-7-58-12-PM.jpg"},
            { name: "Aminul Haque Mallick", designation: "Vice President", image: "https://i.ibb.co.com/mFt7dJ2N/Aminul-Haque-Mallick.jpg" },
            { name: "Dr. Aleem Al Razee Khan", designation: "Vice President", image: "https://i.ibb.co.com/mVhCpHFc/Aleem-Al-Razee-Khan.jpg" },
            { name: "Selim Rahman", designation: "Vice President", image: "https://i.ibb.co.com/pr1nRWKF/Salim-Rahman.jpg" },
        ], cols: "grid-cols-2 md:grid-cols-4"
    },
    {
        role: "secretaries_1", members: [
            { name: "Morshed Hasan", designation: "General Secretary", image: "https://i.ibb.co.com/TDJRc6D1/Morshed-Hasan.jpg" },
            { name: "A H M Faizur Rahman", designation: "Joint Secretary", image: "https://i.ibb.co.com/pBKbd1j6/A-H-M-Faizur-Rahman.jpg" },
            { name: "Muhammad shahqul Alam shaheen", designation: "Treasurer", image: "https://i.ibb.co.com/dJBQZg8k/Muhammad-Shafiqul-Alam-Shaheen.jpg" },
            { name: "Al-Arifin Khan", designation: "Finance Secretary", image: "https://i.ibb.co.com/rGn0crSg/AL-AREFIN-KHAN.jpg" },
            
            // { name: "Morshedur Rahman Milon", designation: "Organizing Secretary", image: memberImage },
        ], cols: "grid-cols-2 md:grid-cols-4"
    },
    {
        role: "secretaries_2", members: [
            { name: "Meer Mohammad Ashraful Alam", designation: "Office Secretary", image: "https://i.ibb.co.com/Z6ZBtYT4/Meer-Mohammad-Ashraful-Alam.jpg" },
            { name: "Dr. Shila Kabir", designation: "Women Affairs Secretary", image: "https://i.ibb.co.com/gMtTWXmS/Whats-App-Image-2026-05-02-at-7-58-00-PM.jpg" },
            { name: "Sawda Binte Faiz", designation: "Youth Affairs Secretary", image: "https://i.ibb.co.com/9HxJg6p9/Sawda-Binte-Faiz.jpg" },
            { name: "Ashraf Shiddike Rizve", designation: "ICT & Exhibition Secretary", image: "https://i.ibb.co.com/fYWfzH4k/Ashraf-Shiddike-Rizve.jpg" },
            { name: "Mohammad Saifuddin Parvez", designation: "Publication Secretary", image: "https://i.ibb.co.com/vWy2bDT/Mohammed-Shaifuddin-Parvez.jpg" },
            { name: "Ali Mohammad Masud", designation: "Publicity Secretary", image: "https://i.ibb.co.com/XZ7Q24BM/ALI-MOHAMMAD-MASUD.jpg" },
        ], cols: "grid-cols-2 md:grid-cols-6"
    },
    {
        role: "executive_members", members: [
            { name: "Mohammad Jahirul Islam", designation: "Executive Member", image: "https://i.ibb.co.com/1fVzWPFd/MOHAMMED-JAHIRUL-ISLAM.png" },
            { name: "Shaik Hasibur Ahsan", designation: "Executive Member", image: "https://i.ibb.co.com/1f015g6G/Shaik-Hasibul-Ahsan.jpg" },
            { name: "Enamul Haque Razu", designation: "Executive Member", image: "https://i.ibb.co.com/nqBpKFd2/Enamul-Haque-Razu.jpg" },
            { name: "Mahfuzur Rahman Tito", designation: "Executive Member", image: "https://i.ibb.co.com/hFy4fdQV/Mahfuzur-Rahman-Tito.jpg" },
            { name: "Himel Mark Rozario", designation: "Executive Member", image: "https://i.ibb.co.com/WN3Q0rb0/Himel-Mark-Rozario.jpg" },
            // { name: "Dr. Nazmul Islam Bappy", designation: "Executive Member", image: memberImage },
            
        ], cols: "grid-cols-2 md:grid-cols-5"
    },
];








