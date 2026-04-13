
export const CommitteeCard = ({ name, role, img, isLarge }) => (
    <div className="group flex flex-col items-center text-center">
        <div className={`relative overflow-hidden rounded-2xl mb-4 border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105 ${isLarge ? 'w-64 h-72' : 'w-48 h-56'}`}>
            <img
                src={img}
                alt={name}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <h3 className={`font-bold text-slate-900 ${isLarge ? 'text-xl' : 'text-lg'}`}>{name}</h3>
        <p className="text-[#26bba4] font-medium text-sm uppercase tracking-wide">{role}</p>
    </div>
);