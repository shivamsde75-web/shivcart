import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp, sendOtp } from "../services/otpService";
import "../styles/auth.css";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Email nahi mila to register page par bhej do
  if (!email) {
    navigate("/register");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const data = await verifyOtp(email, otp);

      setMessage(data.message || "OTP verified successfully");

      // OTP verify hone ke baad login page
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResending(true);
      setError("");
      setMessage("");

      const data = await sendOtp(email);

      setMessage(data.message || "OTP sent successfully");
    } catch (error) {
      setError(error.message);
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1>Verify OTP</h1>

          <p className="auth-subtitle">Enter the OTP sent to</p>

          <p className="otp-email">{email}</p>

          {error && <div className="auth-error">{error}</div>}

          {message && <div className="auth-success">{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="otp">OTP</label>

              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                required
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          <div className="otp-resend">
            <p>Didn't receive the OTP?</p>

            <button
              type="button"
              className="resend-btn"
              onClick={handleResendOtp}
              disabled={resending}
            >
              {resending ? "Sending..." : "Resend OTP"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default VerifyOTP;
