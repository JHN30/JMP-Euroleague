//eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useAuth } from "../func/useAuth";
import { formatDate } from "../utils/date";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, logout, newVerifyEmail } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();

    try {
      await newVerifyEmail();
      navigate("/verify-email");
      console.log("Email sent successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full mx-auto mt-10 p-8 bg-neutral backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-orange-400"
    >
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400 to-amber-400 text-transparent bg-clip-text">
        Dashboard
      </h2>

      <div className="space-y-6">
        <motion.div
          className="p-4 bg-neutral rounded-lg border border-orange-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-orange-400 mb-3">Profile Information</h3>
          <p className="text-gray-300">Name: {user.username}</p>
          <p className="text-gray-300">Email: {user.email}</p>
          <p className="text-gray-300">Are you verified: {user.isVerified ? "Yes" : "No"}</p>
        </motion.div>
        <motion.div
          className="p-4 bg-neutral rounded-lg border border-orange-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-orange-400 mb-3">Account Activity</h3>
          <p className="text-gray-300">
            <span className="font-bold">Joined: </span>
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-300">
            <span className="font-bold">Last Login: </span>

            {formatDate(user.lastLogin)}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={user.isVerified ? handleLogout : handleVerifyEmail}
          className="w-full py-3 px-4 bg-gradient-to-r from-orange-400 to-amber-400 text-white 
				font-bold rounded-lg shadow-lg hover:from-orange-500 hover:to-amber-500
				 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          {user.isVerified ? "Logout" : "Verify Email"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;
