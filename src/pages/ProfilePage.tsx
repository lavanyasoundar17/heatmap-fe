import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faHome } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../styles/ProfilePage.css";

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    profileImageUrl: "",
  });
  const [editingField, setEditingField] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("user"));

  const handleFieldEdit = (field: string) => {
    setEditingField(field);
  };

  const handleFieldChange = (field: string, value: string) => {
    setUser((prevUser) => ({ ...prevUser, [field]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setNewImage(file);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    try {
      // Update user profile
      const response = await fetch(
        `http://localhost:8080/user/profile-update/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setEditingField(null);
        alert("Profile updated successfully!");
      } else {
        console.error("Failed to update profile.");
      }

      // Upload profile image if changed
      if (newImage) {
        const formData = new FormData();
        formData.append("file", newImage);

        const imgResponse = await fetch(
          `http://localhost:8080/user/profile-img/${user.id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
            body: formData,
          }
        );

        if (imgResponse.ok) {
          alert("Profile image updated successfully!");
        } else {
          console.error("Failed to upload profile image.");
        }
      }
    } catch (error) {
      console.error("Error saving profile changes:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="profile-container">
      <h1>Profile Page</h1>
      <div className="profile-image-container">
        <img
          src={
            previewImage ||
            user.profileImageUrl ||
            "https://via.placeholder.com/150"
          }
          alt="Profile"
          className="profile-image"
        />
        <label htmlFor="imageUpload" className="profile-image-overlay">
          <span className="camera-icon">📷</span>
        </label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </div>

      <div className="editable-field">
        <label>Name</label>
        <div className="field-wrapper">
          {editingField === "name" ? (
            <input
              type="text"
              value={user.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              onBlur={() => setEditingField(null)}
            />
          ) : (
            <>
              <span>{user.name}</span>
              <FontAwesomeIcon
                icon={faPen}
                className="edit-icon"
                onClick={() => handleFieldEdit("name")}
              />
            </>
          )}
        </div>
      </div>

      <div className="editable-field">
        <label>Email</label>
        <div className="field-wrapper">
          {editingField === "email" ? (
            <input
              type="email"
              value={user.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              onBlur={() => setEditingField(null)}
            />
          ) : (
            <>
              <span>{user.email}</span>
              <FontAwesomeIcon
                icon={faPen}
                className="edit-icon"
                onClick={() => handleFieldEdit("email")}
              />
            </>
          )}
        </div>
      </div>

      <div className="editable-field">
        <label>Password</label>
        <div className="field-wrapper">
          {editingField === "password" ? (
            <input
              type="password"
              value={user.password}
              onChange={(e) => handleFieldChange("password", e.target.value)}
              onBlur={() => setEditingField(null)}
            />
          ) : (
            <>
              <span>{"*".repeat(user.password.length)}</span>
              <FontAwesomeIcon
                icon={faPen}
                className="edit-icon"
                onClick={() => handleFieldEdit("password")}
              />
            </>
          )}
        </div>
      </div>

      <button onClick={handleSaveChanges} className="save-btn">
        Save Changes
      </button>

      <button onClick={() => navigate("/home")} className="home-btn">
        <FontAwesomeIcon icon={faHome} />
        Home
      </button>
    </div>
  );
};

export default ProfilePage;
