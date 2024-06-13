import { useContext } from "react";
import { FaGoogle } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../src/Providers/AuthProvider";

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  console.log("Redirecting from:", from);

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      console.log("Social login successful:", result);
      const loggedInUser = result.user;

      // Save user data
      const saveUser = {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
        photo: loggedInUser.photoURL,
      };

      fetch(`http://localhost:5000`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(saveUser),
      })
        .then((res) => res.json())
        .then(() => {
          navigate(from, { replace: true });
        });
    });
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
