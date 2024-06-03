import { useEffect, useState } from "react";
import axios from "axios";
// import { useForm } from "react-hook-form";
import '../styles/styleBlogList.css';

type BlogType = {
  id: number;
  content: string;
  user_id: string;
  created_at: any;
  updated_at: any;
};

// type AddBlogType = {
//   content: string;
//   // id: string;
// }

const BlogList = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  // const { register, handleSubmit } = useForm<AddBlogType>();
  const [isPending, setIsPending] = useState(true);

  // ブログの追加
  // const addBlog = async (event: AddBlogType) => {
  //   const blog = event.content;
  //   console.log(blog);
  //   await axios
  //     .post("http://localhost:3333/add", {
  //       data: { blog }
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       const blog = response.data;
  //       setBlogs((preBlogs) => [blog, ...preBlogs]);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // }

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
    setTimeout(() => {
      axios.get("http://localhost:3333")
        .then((response) => {
          setIsPending(false)
          const { blogs } = response.data;
          console.log(blogs[1].created_at)
          setBlogs(blogs);
        });
    }, 1000);
  }, []);

  return (
    <div className="bloglist">
      {/* タイトル */}
      <nav className="navbar">
        <h1>BlogList</h1>
        <div className="links">
          <a href="/create" style={{
            color: "white",
            backgroundColor: "#f1356d",
            borderRadius: "8px"
          }}>New Blog</a>
        </div>
      </nav>

      <div>
        {isPending && <h3 style={{margin: 30}}>Now Loading...</h3>}
      </div>
      {/* <form onSubmit={handleSubmit(addBlog)}>
      <input {...register("content")} type="text" />
      <button type="submit">add</button>
    </form> */}
      <div className="blog-list">
        <div className="blogs">
          {blogs.map((blog) => (
            <div className="blog-preview" key={blog.id} >
              <p className="author">投稿者 : {blog.user_id}</p>
              <h4>{blog.content}</h4>
              <span style={{display: "flex"}}>
                <p className="date">投稿日時 : {blog.created_at}</p>
                <button className="button" onClick={() => deleteBlog(blog.id)}>
                  delete
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default BlogList;