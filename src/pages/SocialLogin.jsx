import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  console.log("Redirecting from:", from);

  const { updateUserProfile } = useContext(AuthContext);

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      console.log("Social login successful:", result);
      const loggedInUser = result.user;

      // Update user profile
      await updateUserProfile(loggedInUser.displayName, loggedInUser.photoURL);

      // Save user data to backend
      const saveUser = {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
        photo: loggedInUser.photoURL,
      };

      const response = await fetch(
        "https://tixify-api.sifatniloy.top/saveUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(saveUser),
        }
      );

      if (response.ok) {
        console.log("User data saved successfully");
        navigate(from, { replace: true });
      } else {
        console.error("Failed to save user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error during social login:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg w-full"
      >
        <FaGoogle /> Login With Google
      </button>
    </div>
  );
};

export default SocialLogin;
