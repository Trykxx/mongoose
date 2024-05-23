import { useContext, useState } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // Etape 12: Front
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  function handleUsername(e) {
    setUsername(e.target.value);
  }

  function handleAvatar(e) {
    setAvatar(e.target.value);
  }

  function SubmitChanges(e) {
    e.preventDefault();

    user.username = username;
    user.avatarUrl = avatar;

    const token = localStorage.getItem("access_token");
    console.log("Token :", token);
    const response = fetch("/api/users/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  if (!user) {
    return navigate("/connexion");
  }

  //   Etape 11  : Page de profile
  return (
    <>
      <div>
        <p style={{ color: "green", textDecoration: "underline" }}>
          Vous etes connecté !
        </p>

        <img
          src={user.avatarUrl ? user.avatarUrl : "/avatar-url.png"}
          alt="Avatar de l'utilisateur"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
        <p>Username : {user.username}</p>
        <p>Email : {user.email}</p>
      </div>
      {/* Etape 12  : Modification du profile */}
      <form>
        <input
          type="text"
          placeholder="Nouvel username"
          value={username}
          onChange={handleUsername}
        />
        <input
          type="text"
          placeholder="Nouvel Avatar"
          value={avatar}
          onChange={handleAvatar}
        />
        <button onClick={SubmitChanges}>Soumettre</button>
      </form>
    </>
  );
}
