import React, { useRef, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const show = useRef(null)
    const [toggle, setToggle] = useState(false)

    const navigate = useNavigate()

    async function handelSubmit(e) {
        e.preventDefault()

        let { username, password } = e.target

        console.log(username.value, password.value)

        let data = await fetch("https://stg.dhunjam.in/account/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        })

        let res = await data.json()
        sessionStorage.setItem("code", JSON.stringify(res.data.id))
        navigate(`/admin`, {
            state: {
                id: res.data.id
            }
        })
    }


    return (
        <>
            <div style={{ flexDirection: "column" }} className='flex justify-center items-center text-center min-h-[100vh]'>
                <div>
                    <h1 className='text-white text-[32px] mb-8'>Venue Admin Login</h1>
                    <form onSubmit={handelSubmit}>
                        <input className='block text-[16px] text-white w-[30rem] bg-transparent border-[1px] border-gray-400 mb-4 p-2 rounded-md' type="text" name='username' placeholder='Username' />
                        <div className='relative'>
                            <input ref={show} className='w-[30rem] text-[16px] bg-transparent text-white border-[1px] border-gray-400 mb-4 p-2 rounded-md' type="password" name='password' placeholder='Password' />
                            <div onClick={() => {
                                setToggle(true)
                                show.current.type = "text"
                            }} className={`absolute ${toggle ? "hidden" : null} top-2 right-2 cursor-pointer`}>
                                <VisibilityIcon sx={{ color: "white" }} />
                            </div>
                            <div onClick={() => {
                                setToggle(false)
                                show.current.type = "password"
                            }} className={`absolute ${toggle ? null : "hidden"} top-2 right-2 cursor-pointer`}>
                                <VisibilityOffIcon sx={{ color: "white" }} />
                            </div>
                        </div>
                        <button className='text-[16px] bg-[#6741D9] text-white w-[30rem] py-2 rounded-md mt-4' type='submit'>Sign In</button>
                        <p className='text-white text-[16px] text-center my-4 font-light'>New Registration ?</p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login