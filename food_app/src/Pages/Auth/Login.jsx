import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signinUser } from "../../apis/Auth";
import AppContext from "../../Context/AppContext";
import { Circles } from "react-loader-spinner";
import Navbar from "../../Components/Navbar/Navbar";
const url =
  "https://res.cloudinary.com/dmpir7wfy/image/upload/v1704534959/bzyxpy8tryztgzwpyfhp.jpg";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const time = setTimeout(() => {
      if (user) {
        navigate("/");
      } else {
        navigate("/login");
      }
    }, 1);

    return () => {
      clearTimeout(time);
    };
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await signinUser(formData.email, formData.password);

      setFormData({
        email: "",
        password: "",
      });

      if (response) {
        const { name, status, id } = response;

        const user = { id, name, status };
        setUser(user);

        const expirationTime = Date.now() + 30 * 60 * 1000;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("sessionExpiration", expirationTime);

        navigate("/");
        toast.success("User logged-in successfully");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${url})`,
          backgroundSize: "cover",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "360px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1em",
            backgroundColor: "rgba(255,255,255,0.9)",
            padding: "2em",
            borderRadius: "1em",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <label htmlFor="password" style={{ color: "#666" }}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={{
                borderColor: "#666",
                backgroundColor: "var(--bg)",
                borderRadius: "1em",
                padding: "0.8em",
                border: "1px solid #666",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <label htmlFor="password" style={{ color: "#666" }}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={{
                borderColor: "#666",
                backgroundColor: "var(--bg)",
                borderRadius: "1em",
                padding: "0.8em",
                border: "1px solid #666",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.8em",
              borderRadius: "1em",
              backgroundColor: "var(--pink)",
              color: "white",
              marginTop: "1em",
              border: "none",
            }}
          >
            {isLoading ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Circles height={20} width={20} color="white" />
              </div>
            ) : (
              "Log-in"
            )}
          </button>
          <div style={{ fontSize: "var(--text-sm)" }}>
            <p>
              {"Don't have an account?"}
              <em
                onClick={() => navigate("/signup")}
                style={{
                  color: "var(--pink)",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                sign-up
              </em>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
