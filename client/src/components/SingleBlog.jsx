import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/config";

const SingleBlog = () => {
  const [blogData, setBlogData] = useState({});
  const { id } = useParams();

  const getSingleBlog = async () => {
    const res = await fetch(`${BASE_URL}/blog/getsingleblog/${id}`);
    const { data } = await res.json();
    setBlogData(data);
  };

  useEffect(() => {
    getSingleBlog();
  }, []);

  return (
    <>
      <img
        src="https://img.freepik.com/free-photo/technology-communication-icons-symbols-concept_53876-120314.jpg?semt=ais_hybrid&w=740&q=80"
        alt=""
      />
      <h1>{blogData.title}</h1>
      <h1>{blogData.topic}</h1>
      <h1>{blogData.content}</h1>
    </>
  );
};

export default SingleBlog;
