import React from "react";
import { useState } from "react";

export default function Home() {
  const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError("Titre et Description sont obligatoires");
      return;
    }
  };

  return (
    <>
      <form>
        <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
      </form>
    </>
  );
}
