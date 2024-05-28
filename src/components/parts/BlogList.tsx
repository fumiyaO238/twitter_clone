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

const BlogList = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3333").then((response) => {
      console.log(response.data.blogs);
      const { blogs } = response.data;
      setBlogs(blogs);
    });
  }, []);

  return (
    <div>
      <h1 style={{margin:"auto"}}>BlogList</h1>
    </div>
  )
}

export default BlogList;