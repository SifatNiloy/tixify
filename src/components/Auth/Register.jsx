import { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from "react-simple-captcha";
import Swal from "sweetalert2";
import Input from '../UI/Input';
import Button from '../UI/Button';
import Alert from '../UI/Alert';
import { AuthContext } from "../../Providers/AuthProvider";

const Register = () => {
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);

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

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      // Create user
      const result = await createUser(email, password);
      const loggedUser = result.user;

      // Update user profile
      await updateUserProfile(form.name.value, form.photoURL.value);

      // Show success message
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Redirecting to login page
      navigate('/login');
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate('/dashboard'); // Redirecting to dashboard after successful sign-in
    } catch (err) {
      setError("Google Sign-In failed. Please try again.");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 py-24">
        <div className="w-full md:w-1/2 lg:w-2/3 xl:w-1/3 p-6 rounded-lg bg-white shadow-xl  ">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-6">Sign Up Now!</h1>
          <p className="text-lg text-gray-700 text-center mb-6">Create an account to access exclusive events and book your tickets easily.</p>
          <form onSubmit={handleRegister}>
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
            </div>
            <div className="mb-4">
              <Input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <Input
                type="text"
                name="photoURL"
                placeholder="Enter your photo URL (optional)"
                className="input input-bordered w-full"
                // required
              />
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
                Sign Up
              </Button>
            </div>
            
            <p className="text-sm text-center mb-4">Already have an account? <Link className="text-blue-500 hover:underline" to="/login">Log In</Link></p>
            <div className="divider my-4">OR</div>
            <div className="mb-4">
              <Button
                type="button"
                onClick={handleGoogleSignIn}
                className="btn btn-google w-full"
              >
                Sign Up with Google
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
