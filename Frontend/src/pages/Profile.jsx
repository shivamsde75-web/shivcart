import { useAuth } from "../context/AuthContext";
import "../styles/profile.css";

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <main className="profile-page">
        <div className="profile-card empty-state">
          <h2>Please login to view your profile.</h2>
        </div>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <p className="profile-label">Welcome</p>
            <h1>{user.name}</h1>
          </div>
        </div>

        <div className="profile-info-grid">
          <div className="profile-info-item">
            <span className="profile-key">Name</span>
            <strong>{user.name}</strong>
          </div>

          <div className="profile-info-item">
            <span className="profile-key">Email</span>
            <strong>{user.email}</strong>
          </div>

          <div className="profile-info-item">
            <span className="profile-key">Role</span>
            <strong className="profile-role">{user.role}</strong>
          </div>

          <div className="profile-info-item">
            <span className="profile-key">Status</span>
            <strong>
              {user.verified ? "Verified" : "Pending verification"}
            </strong>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
