import { Link } from "react-router-dom";
import Construction from "../../assets/construction.svg";

const ProfilePage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <img src={Construction} alt="Under Construction" className="pt-8 w-1/3" />
      <p className="text-2xl">Page under construction</p>
      <p>Please come back later</p>
      <Link to="/">
        <button className="w-32 h-12 text-2x1 text-white bg-orange-400 hover:bg-amber-500 transition duration-300 rounded-sm">
          Home
        </button>
      </Link>
    </div>
  );
};

export default ProfilePage;
