import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast"
import { registerUser } from "../../services/auth.service";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate =useNavigate();

  const [errors, setErrors] = useState({});
  const [loading,setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required.";

    if (!formData.username.trim())
      newErrors.username = "Username is required.";

    if (!formData.email.trim())
      newErrors.email = "Email is required.";

    if (!formData.password)
      newErrors.password = "Password is required.";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password.";

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // If form is invalid, we do not proceed

    try{
      setLoading(true);

      const payload={
        fullname:formData.fullName,
        username:formData.username,
        email:formData.email,
        password:formData.password,
      };

      const response= await registerUser(payload);
      console.log("Registration Successfull: ", response);

      toast.success("Registration Successfull");

      setTimeout(()=>{
        navigate("/login");
      },1200);
      
    }
    catch(err){

      console.error(err);
      toast.error(err.response?.data?.message);

    }
    finally{
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start solving problems and level up your coding skills."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <AuthInput
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          required
        />

        <AuthInput
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
          required
        />

        <AuthInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <AuthInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />

        <AuthInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
        />

        <div className="pt-2">
          <AuthButton loading={loading}>
            Create Account
          </AuthButton>
        </div>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[var(--accent)] transition hover:opacity-80"
          >
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;