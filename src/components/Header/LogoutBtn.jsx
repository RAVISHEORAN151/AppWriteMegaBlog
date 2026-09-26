import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const success = await authService.logout();

    if (success) {
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <button
      onClick={logoutHandler}
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-fuchsia-400/50 bg-fuchsia-500/10 px-5 py-2.5 text-xl font-semibold text-fuchsia-100 shadow-[0_0_15px_rgba(217,70,239,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300 hover:bg-fuchsia-500/25 hover:text-white hover:shadow-[0_0_25px_rgba(217,70,239,0.6)] active:translate-y-0"
    >
      
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-fuchsia-300/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      
      <span className="relative text-base transition-transform duration-300 group-hover:-translate-x-1">
        <i class="fa-solid fa-right-from-bracket"></i>
      </span>
    
      <span className="relative">
        Logout
      </span>
    </button>
  );
}

export default LogoutBtn;