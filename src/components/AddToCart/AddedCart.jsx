import axios from "axios";
import { Trash2,  Minus, Plus } from "lucide-react";
import Swal from "sweetalert2";

const AddedCart = ({ item, gallery, queryClient}) => {
 
  
    const handleDelete = async (id) => {

        // console.log("checking",id)
        const result = await Swal.fire({
            title: "Remove item?",
            text: "Are you sure you want to remove this from your cart?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#26bba4",
            cancelButtonColor: "#f87171",
            confirmButtonText: "Yes, remove it!"
        });

        if (result.isConfirmed) {
            try {
                const res = await axios.get(`https://data.bnpa.bd/delete-add-cart/${id}`);
                
                // console.log("from delte", res)
                if (res.data.success) {
                    queryClient.invalidateQueries(['cart-items']);
                    Swal.fire({ title: "Removed!", icon: "success", timer: 1500, showConfirmButton: false });
                }
            } catch (error) {
                Swal.fire("Error", "Could not remove item", "error");
            }
        }
    };
    return (
        <div>
            <div  className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-6 group hover:border-[#26bba4]/30 transition-all">
                <div className="relative shrink-0">
                    <img src={item.photo} alt={item.title} className="w-32 h-32 object-cover rounded-2xl bg-slate-100" />
                    <div className="absolute -bottom-2 -right-2 bg-white shadow-md p-1.5 rounded-lg flex gap-1">
                        {gallery?.slice(0, 2).map((img, idx) => (
                            <div key={idx} className="w-4 h-4 rounded-sm bg-slate-200 overflow-hidden">
                                <img src={gallery.length === 0 ? "https://i.ibb.co/4wSKjqGj/images.jpg" : img} className="object-cover h-full w-full" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 text-center sm:text-left">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#26bba4] bg-[#26bba4]/10 px-2 py-1 rounded-md mb-2 inline-block">
                        {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-800 mb-1 line-clamp-1">{item.title}</h3>
                    <p className="text-slate-400 text-xs mb-3 italic">Condition: {item.con}</p>

                    <div className="flex items-center justify-center sm:justify-start gap-4">
                        <span className="text-xl font-black text-slate-900">৳{item.price}</span>
                        <div className="flex items-center border border-slate-100 rounded-lg overflow-hidden">
                            <button className="p-1 hover:bg-slate-50 text-slate-400"><Minus size={14} /></button>
                            <span className="px-3 py-1 text-xs font-bold text-slate-700">1</span>
                            <button className="p-1 hover:bg-slate-50 text-slate-400"><Plus size={14} /></button>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => handleDelete(item.id)}
                    className="p-4 text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all rounded-2xl"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </div>
    );
};

export default AddedCart;