import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import { UserCard } from './UserCard'


const Feed = () => {
  const feed = useSelector((store) => store.feed);
  console.log(feed);
  const dispatch = useDispatch();

  const feedUser = async () => {
    if(feed) return;
    try{
    const res = await axios.get(BASE_URL + "/feed", {
      withCredentials: true,
    })
    dispatch(addFeed(res.data));

  }
  catch(err){
    //error will be handle here
  }
}
  useEffect(() => {
    feedUser();
  },[]);


  return (
    feed &&(
    <div className='flex justify-center my-10'>
        <UserCard user={feed[0]} />
    </div>
    )
  )
}

export default Feed