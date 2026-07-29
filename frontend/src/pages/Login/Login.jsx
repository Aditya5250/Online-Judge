import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import { setToken, setUser } from "../../utils/auth";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import { getCurrentUser, loginUser } from "../../services/auth.service";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();
  

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const loginResponse = await loginUser(formData);

      setToken(loginResponse.token);

      const meResponse = await getCurrentUser();

     

      login(meResponse.user);
      
     

      toast.success("Login successful!");

      if(meResponse.user.role==="ADMIN"){
        navigate("/admin/");

      }
      else{
        navigate("/dashboard")
      }

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed."
      );
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Continue your coding journey."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
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

        <AuthButton loading={loading} loadingText="Signing In...">
          Login
        </AuthButton>

        <p className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-[var(--accent)]"
          >
            Create Account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;