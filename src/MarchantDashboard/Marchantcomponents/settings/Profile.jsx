// import { User } from "lucide-react";
// import SettingSection from "./SettingSection";

// const Profile = () => {
// 	return (
// 		<SettingSection icon={User} title={"Profile"}>
// 			<div className='flex flex-col sm:flex-row items-center mb-6'>
// 				<img
// 					src='https://randomuser.me/api/portraits/men/3.jpg'
// 					alt='Profile'
// 					className='rounded-full w-20 h-20 object-cover mr-4'
// 				/>

// 				<div>
// 					<h3 className='text-lg font-semibold text-gray-100'>John Doe</h3>
// 					<p className='text-gray-400'>john.doe@example.com</p>
// 				</div>
// 			</div>

// 			<button className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto'>
// 				Edit Profile
// 			</button>
// 		</SettingSection>
// 	);
// };
// export default Profile;


import { useEffect, useState } from "react";
import { User } from "lucide-react";
import SettingSection from "./SettingSection";
import axios from "axios";
import { useSelector } from "react-redux";

const Profile = () => {
  const [merchant, setMerchant] = useState(null);
  const [loading, setLoading] = useState(true);

  // Example: You stored token + merchantId after login
  const marchantId = useSelector((state) => state.marChantData._id);
  console.log(marchantId)
  const token = useSelector((state) => state.marChantData.token);
  useEffect(() => {
    const fetchMerchant = async () => {
      try {
        const res = await axios.get(
          `https://andrewecomerceback.onrender.com/api/v1/merchant-getone/${marchantId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMerchant(res.data.data);
      } catch (error) {
        console.error("Error fetching merchant:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMerchant();
  }, [marchantId, token]);

  if (loading) return <p className="text-gray-400">Loading...</p>;
  if (!merchant) return <p className="text-red-500">Merchant not found.</p>;

  return (
    <SettingSection icon={User} title={"Profile"}>
      <div className="flex flex-col sm:flex-row items-center mb-6">
        <img
          src={merchant.profileImage || "https://via.placeholder.com/100"}
          alt="Profile"
          className="rounded-full w-20 h-20 object-cover mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-100">
            {merchant.fullName}
          </h3>
          <p className="text-gray-400">{merchant.email}</p>
          <p className="text-gray-400">{merchant.phoneNumber}</p>
          <p className="text-gray-400 italic">{merchant.description}</p>
        </div>
      </div>

      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto"
        onClick={() => alert("Open edit modal")}
      >
        Edit Profile
      </button>
    </SettingSection>
  );
};

export default Profile;
