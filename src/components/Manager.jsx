import React from 'react'
import { useRef, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Manager = () => {
    const ref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])

    const showPassword = () => {
        // alert("show the password")
        console.log(ref.current.src)
        if (ref.current.src.includes("icons/Crosseye.svg")) {
            ref.current.src = "icons/Openeye.svg"
        }
        else {
            ref.current.src = "icons/Crosseye.svg"
        }
    }

    const savePassword = () => {
        if (form.site.length > 5 && form.site.username > 2 && form.site.password > 8) {
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
            toast('🦄 Password Saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else{
            toast('Error! : Not blank and site should be 5 letters, username should be 2 letters, password should be 8 letters  ')
        }
    }

    const deletePassword = (id) => {
        console.log("Deleting ID", id)
        let c = confirm('Do you really delete this Password')
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast('🦄 Password deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const editPassword = (id) => {
        console.log("Editing ID", id)
        setform(passwordArray.filter(i => i.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <><ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition="Bounce"
        />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>

            <div className="md:px-[8.3rem] py-[4rem] min-h-[85.4vh]">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>
                    User
                    <span className='text-green-500'>Login/&gt;</span>
                </h1>
                <p className='text-green-800 text-lg text-center'>Manage your passwords securely and easily</p>

                <div className="flex flex-col p-1 text-black gap-3 items-center">
                    <input value={form.site} onChange={handlechange} placeholder="Enter website URL" className="rounded-full border border-green-500 w-full py-2 px-5" type="text" name='site' id='site' />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-3">
                        <input value={form.username} onChange={handlechange} placeholder="Enter Username" className="rounded-full border border-green-500 w-full py-2 px-5" type="text" name='username' id='username' />
                        <input value={form.password} onChange={handlechange} placeholder="Enter Password" className="rounded-full border border-green-500 py-2 px-5" type="password" name='password' id='password' />
                        <span className='absolute right-[9rem] top-[14.8rem] cursor-pointer' onClick={showPassword}>
                            {/* <img ref={ref} width={23} src="icons/Openeye.svg" alt="eye" /> */}
                        </span>
                    </div>
                    <button onClick={savePassword} className='rounded-full flex justify-center items-center bg-green-500 hover:bg-green-700 py-2 px-4 w-fit'>
                        <span className='px-1 w-7'>
                            <img src="icons/addicon.png" alt="" />
                            {/* {/* <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 14h2v-3h3V9h-3V6h-2v3H8v2h3zm-9 8V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18H6z" /></svg> */}
                        </span>
                        Save Password
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full mb-0">

                        <thead className='bg-green-800 border text-white border-black'>
                            <tr>
                                <th>Website URL</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-200 border border-black'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-black text-center w-32'><a href={item.site}>{item.site}</a></td>
                                    <td className='py-2 border border-black text-center w-32'>{item.username}</td>
                                    <td className='py-2 border border-black text-center w-32'>{item.password}</td>
                                    <td className='py-2 border border-black justify-center text-center w-5'><button className='mx-4 cursor-pointer' onClick={() => { editPassword(item.id) }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>Edit
                                    </button>
                                        <button className='mx-4 cursor-pointer' onClick={() => { deletePassword(item.id) }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                        </svg>
                                            Delete</button></td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
