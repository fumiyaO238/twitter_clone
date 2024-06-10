import { useEffect, useState } from "react";
import axios from "axios";
import '../styles/styleBlogList.css';

export type BlogType = {
  id: number;
  content: string;
  user_id: string;
  created_at: any;
  updated_at: any;
};

type BlogUserType = {
  id: string;
  name: string;
  content: string;
  created_at: any;
  content_id: number;
};

// type AddBlogType = {
//   content: string;
//   // id: string;
// }

const BlogList = () => {
  const [blogs, setBlogs] = useState<BlogUserType[]>([]);
  const [myUserId, setMyUserId] = useState<string>("");
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
  const deleteBlog = async (id: string) => {
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
    const token = localStorage.getItem("keyToken")
    setTimeout(() => {
      axios.get("http://localhost:3333",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
        .then((response) => {
          setIsPending(false)
          const blogs = response.data.result;
          const userId = response.data.userId
          setBlogs(blogs);
          setMyUserId(userId);
        });
    }, 300);
  }, []);

  return (
    <div className="bloglist">
      {/* タイトル */}
      <nav className="navbar">
        <h1>BlogList</h1>
        <div className="links">
          <a href={`/create/${myUserId}`}>New Blog</a>
        </div>
      </nav>

      <div>
        {isPending && <h3 style={{ margin: 30 }}>Now Loading...</h3>}
      </div>
      {/* <form onSubmit={handleSubmit(addBlog)}>
      <input {...register("content")} type="text" />
      <button type="submit">add</button>
    </form> */}
      <div className="blog-list">
        <div className="blogs">
          {blogs.map((blog) => (
            <div className="blog-preview" key={blog.content_id} >
              <p className="author">投稿者 : {blog.name}</p>
              <h4>{blog.content}</h4>
              <span style={{ display: "flex" }}>
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