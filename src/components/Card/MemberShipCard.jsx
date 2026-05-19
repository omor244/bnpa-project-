

const MemberShipCard = ({ member }) => {
   
    return (
        <div>
            <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">

                {/* 1. Picture */}
                <div className="  bg-gray-100">
                    <img
                        src={member.profileImage || 'https://via.placeholder.com/150'}
                        alt={member.fullName}
                        className="w-58 h-60 mx-auto object-cover"
                    />
                </div>

                <div className="p-4  mx-auto space-y-2 text-sm">
                    {/* 2. Name */}
                    <h2 className="text-lg text-center font-bold text-[#26bba4] uppercase leading-tight">
                        {member.fullName}
                    </h2>

                  

                    {/* 3. Member Number/Type */}
                    <p className="flex  justify-center items-center gap-2.5">
                        <span className="font-semibold text-black text-xs uppercase">Member Type:</span>
                        <span className="text-gray-800">{member.memberType} </span>
                    </p>

                    {/* 4. Cell Number */}
                    <p className="flex justify-center  items-center gap-2.5">
                        <span className="font-semibold  text-black  text-xs uppercase">Cell Number:</span>
                        <span className="text-gray-800">{member.mobile}</span>
                    </p>

                    {/* 5. e-Mail */}
                    <p className="flex justify-center  items-center gap-2.5">
                        <span className="font-semibold text-black  text-xs uppercase">e-Mail:</span>
                        <span className="text-blue-600 break-all">{member.email}</span>
                    </p>

                   
                    {/* <p className="flex gap-2 items-start">
                        <div className="font-semibold  text-black  text-xs uppercase ">Postal Address:</div>
                        <span className="text-gray-600 italic ">
                            { member.address}
                        </span>
                    </p> */}
                </div>

                
            </div>
        </div>
    );
};

export default MemberShipCard;