import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import {toast} from 'react-toastify';
function Profile() {
    const user = useSelector((state)=>state.user.user);
    if(!user){
      return <p>Loading...</p>
    }
    const handleLogout=()=>{
      signOut(auth)
      .then(()=>{
        toast.success('user logged out !');
      })
      .catch((error)=>{
        toast.error(error.message)
      })
    }
  return (
    <div>
        <Header/>
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <h1>{user.name}</h1>
            <h2>{user.email}</h2>
            <p>{user.uid}</p>
            <Button text={'Logout'} onClick={handleLogout}/>
        </div>
    </div>
  )
}

export default Profile