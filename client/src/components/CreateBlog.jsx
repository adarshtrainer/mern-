import React from "react";

const CreateBlog = () => {
  const handleChange = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="container">
        <h2 className="text-center">Create Blog</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleChange}
            id="title"
            className="form-control mt-2"
            placeholder="Enter Blog Title"
          />
          <input
            type="text"
            onChange={handleChange}
            id="topic"
            className="form-control mt-2"
            placeholder="Enter Blog topic"
          />
          <textarea
            rows="9"
            className="form-control mt-2"
            placeholder="Enter blog content"
            id="content"
          ></textarea>
          <button className="btn btn-info mt-2" type="submit">
            Create Blog
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateBlog;
