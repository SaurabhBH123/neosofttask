import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [posts, setPosts] = useState([])
  const [sortOptions,setSortOptions] = useState({
    userIdSort: "",
    idSort: "",
    titleSort: "",
    bodySort: "",
  })
  
  useEffect(()=>{
    fetchPosts()
  },[])

  const fetchPosts = () => {
    axios.get(`https://jsonplaceholder.typicode.com/posts`)
    .then((res)=>{
      setPosts(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const handleChange = (e)=>{
    const {name,value} = e.target;
    setSortOptions({
      ...sortOptions,[name]:value
    })

    if(value === "ascUser"){
      const sortedData = posts.sort((a,b)=> a.userId - b.userId);
    }else if(value === "descUser"){
      const sortedData = posts.sort((a,b)=> b.userId - a.userId);
    }
    if(value === "ascId"){
      const sortedData = posts.sort((a,b)=> a.id - b.id);
    }else if(value === "descId"){
      const sortedData = posts.sort((a,b)=> b.id - a.id);
    }
    if(value === "ascTitle"){
      const sortedData = posts.sort((a,b)=> {
        if(a.title > b.title) return 1;
        if(a.title < b.title) return -1;
        else return 0;
      });
    }else if(value === "descTitle"){
      const sortedData = posts.sort((a,b)=> {
        if(a.title > b.title) return -1;
        if(a.title < b.title) return 1;
        else return 0;
      });
    }
    if(value === "ascBody"){
      const sortedData = posts.sort((a,b)=> {
        if(a.body > b.body) return 1;
        if(a.body < b.body) return -1;
        else return 0;
      });
    }else if(value === "descBody"){
      const sortedData = posts.sort((a,b)=> {
        if(a.body > b.body) return -1;
        if(a.body < b.body) return 1;
        else return 0;
      });
    }
  }

  
  return (
    <>
      <h1>Posts</h1>
      <select name="userIdSort" value={sortOptions.userIdSort} onChange={handleChange}>
        <option value="">Sort By UserId</option>
        <option value="ascUser">Asc</option>
        <option value="descUser">Desc</option>
      </select>
      <select name='idSort' value={sortOptions.idSort} onChange={handleChange}>
        <option value="">Sort By Id</option>
        <option value="ascId">Asc</option>
        <option value="descId">Desc</option>
      </select>
      <select name='titleSort' value={sortOptions.titleSort} onChange={handleChange}>
        <option value="">Sort By Title</option>
        <option value="ascTitle">Asc</option>
        <option value="descTitle">Desc</option>
      </select>
      <select name='bodySort' value={sortOptions.bodySort} onChange={handleChange}>
        <option value="">Sort By Body</option>
        <option value="ascBody">Asc</option>
        <option value="descBOdy">Desc</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>User Id</th>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {
            posts?.map(post => {
              return (
                <tr key={post.id}>
                  <td>{post.userId}</td>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default App
