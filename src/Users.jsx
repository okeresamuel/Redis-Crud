import React from 'react'
import axios from "axios"
import "./users.css"
import { useEffect, useState } from 'react';

function Users() {
const [pagecount, setpagecount] = useState(0)
const [isLoading, setIsLoading] = useState(false);
const [users, setUsers] = useState([])


const loadData = async (pagecount) => {
  try {
     setIsLoading(true)
     let response = await axios.get(`http://localhost:5000/api/users?initialAmount=${pagecount}&load_per_scroll=${4}`)
     setUsers([...users, ...response.data])
     setIsLoading(false)
    } catch (err) {
      console.error(err);
  }
};

useEffect(() => {
  loadData(pagecount);
}, [pagecount]);

const handleScroll = (e) => {
   let {scrollTop, scrollHeight, offsetHeight} = e.target
    if(offsetHeight + scrollTop >= scrollHeight){
    setpagecount(users?.length)
   }
};


return (
      <>
      <div className="followUsers_container Component" onScroll={handleScroll}>
        <h4>Add friends Your feed</h4>
        { users?.map((user) => { 
          return (
            <>
              <div>
                <div className="followUsers_Inner_container">    
                    <img className="users_pic" src={user?.profilePhoto} alt="img" />
                  <div>
                  <h3>{user?.username}</h3>
                  <p>{user?.decs}</p>
                  <div>
                  </div>
                  </div>
                </div>
              </div>
            </>
          );
      })}
      </div>
    {isLoading ? <h1 className="loading" style={{color:"white", textAlign: "center"}}>Loading...</h1> : ""}
</>
);
}

export default Users