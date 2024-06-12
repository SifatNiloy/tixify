import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from "react-simple-captcha";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import SocialLogin from "../../pages/SocialLogin";
import Input from '../UI/Input';
import Button from '../UI/Button';
import Alert from '../UI/Alert';

const Login = () => {
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);

  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (!captchaRef.current || !captchaRef.current.loaded) {
      loadCaptchaEnginge(6);
      captchaRef.current.loaded = true;
    }
  }, []);

  const handleValidateCaptcha = () => {
    const user_captcha_value = captchaRef.current.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
      setError(null);
    } else {
      setError("Captcha validation failed. Please try again.");
      setDisabled(true);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully logged in!",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate(from, { replace: true });
    } catch (err) {
      setError("Login failed. Please check your email and password.");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="w-full md:w-1/2 lg:w-2/3 xl:w-1/3 p-6 rounded-lg bg-white shadow-xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h1>
          <p className="text-lg text-gray-700 text-center mb-6">Log in to access exclusive events and book your tickets easily.</p>
          <form onSubmit={handleLogin}>
            {error && <Alert type="error" message={error} />}
            <div className="mb-4">
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                required
              />
              <p className="text-sm text-blue-500 hover:underline mt-1 text-right"><Link to="#">Forgot password?</Link></p>
            </div>
            <div className="mb-4">
              <LoadCanvasTemplate />
              <Input
                ref={captchaRef}
                type="text"
                name="captcha"
                placeholder="Enter CAPTCHA text"
                className="input input-bordered w-full"
                required
              />
              <Button
                type="button"
                onClick={handleValidateCaptcha}
                className="btn btn-outline btn-sm mt-2 w-full"
              >
                Verify CAPTCHA
              </Button>
            </div>
            <div className="mb-4">
              <Button type="submit" className="btn btn-primary w-full" disabled={disabled}>
                Log In
              </Button>
            </div>
            <p className="text-sm text-center mb-4">New here? <Link className="text-blue-500 hover:underline" to="/signup">Create an account</Link></p>
            <div className="divider my-4">OR</div>
            <SocialLogin />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
