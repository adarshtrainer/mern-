import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/config";
import Loding from "./Loding";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogData, setBlogData] = useState([]);

  const getBlogsData = async () => {
    const res = await fetch(`${BASE_URL}/blog/getallblogs`);
    const { data } = await res.json();
    setBlogData(data);
  };

  useEffect(() => {
    getBlogsData();
  }, []);

  console.log(blogData);
  return (
    <>
      {blogData?.length > 0 ? (
        <>
          <div className="container">
            <div className="row row-cols-1 row-cols-lg-3 row-cols-sm-1">
              {blogData.map((blog) => (
                <div class="card mt-2">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT40pM6aCXsWbzd_bnCC6lY7_WvKUkjtd8utQ&s"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">{blog.title}</h5>
                    <h6 class="card-title">{blog.topic}</h6>
                    <p class="card-text">{blog.content}</p>
                    <Link to={`/singleblog/${blog._id}`} class="btn btn-primary">
                      Read Full Blog
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <Loding />
        </>
      )}
    </>
  );
};

export default Home;
