import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

type BlogType = {
  id: number;
  content: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
};

type AddBlogType = {
  content: string;
  // id: string;
}

const BlogList = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const { register, handleSubmit } = useForm<AddBlogType>();

  // ブログの追加
  const addBlog = async (event: AddBlogType) => {
    const blog = event.content;
    console.log(blog);
    await axios
      .post("http://localhost:3333/add", {
        data: { blog }
      })
      .then((response) => {
        console.log(response.data);
        const blog = response.data;
        setBlogs((preBlogs) => [blog, ...preBlogs]);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // ブログの削除
  const deleteBlog = async (id: number) => {
    // console.log(id)

    await axios
      .delete("http://localhost:3333/delete", {
        data: { id }
      })
      .then((response) => {
        console.log(response);
        const newBlogs = blogs.filter((blog) => blog.id !== id);
        setBlogs(newBlogs);
      })
      .catch((e) => {
        console.log(e.message);
        setBlogs(blogs);
      })
  }
 
  // getリクエスト
  useEffect(() => {
    axios.get("http://localhost:3333").then((response) => {
      // console.log(response.data.blogs);
      const { blogs } = response.data;
      setBlogs(blogs);
    });
  }, []);

  return (
    <div>
      <h1 style={{margin:"auto"}}>
        BlogList
      </h1>

      <form onSubmit={handleSubmit(addBlog)}>
        <input {...register("content")} type="text" />
        <button type="submit">add</button>
      </form>

      {blogs.map((blog) => (
        <div style={{display: "flex"}}>
          <p key={blog.id}>
            {blog.content}
          </p>
          <button name="button-delete" onClick={() => deleteBlog(blog.id)}>
            delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default BlogList;