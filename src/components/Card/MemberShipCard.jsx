

const MemberShipCard = ({ member}) => {
    return (
        <div>
            <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">

                {/* 1. Picture */}
                <div className="h-48 w-full bg-gray-100">
                    <img
                        src={member.profileImage || 'https://via.placeholder.com/150'}
                        alt={member.fullName}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-4 space-y-2 text-sm">
                    {/* 2. Name */}
                    <h2 className="text-lg font-bold text-[#26bba4] uppercase leading-tight">
                        {member.fullName}
                    </h2>

                    <div className="divider my-1"></div>

                    {/* 3. Member Number/Type */}
                    <p className="flex items-center gap-2.5">
                        <span className="font-semibold text-black text-xs uppercase">Member Type:</span>
                        <span className="text-gray-800">{member.memberType} (ID: {member.id})</span>
                    </p>

                    {/* 4. Cell Number */}
                    <p className="flex items-center gap-2.5">
                        <span className="font-semibold  text-black  text-xs uppercase">Cell Number:</span>
                        <span className="text-gray-800">{member.mobile}</span>
                    </p>

                    {/* 5. e-Mail */}
                    <p className="flex items-center gap-2.5">
                        <span className="font-semibold text-black  text-xs uppercase">e-Mail:</span>
                        <span className="text-blue-600 break-all">{member.email}</span>
                    </p>

                    {/* 6. Postal Address */}
                    <p className="flex items-center gap-2.5">
                        <span className="font-semibold text-black  text-xs uppercase">Postal Address:</span>
                        <span className="text-gray-600 italic">
                            {member.address.length > 50 ? `${member.address.substring(0, 50)}...` : member.address}
                        </span>
                    </p>
                </div>

                {/* Optional: Card Image Link */}
                {/* <div className="p-2 bg-gray-50 border-t">
                            <a href={member.cardImage} target="_blank" rel="noreferrer" className="btn btn-xs btn-outline btn-error w-full">View ID Card</a>
                        </div> */}
            </div>
        </div>
    );
};

export default MemberShipCard;