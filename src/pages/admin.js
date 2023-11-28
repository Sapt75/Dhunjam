import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Bars from '../components/bar-graph'

const Admin = () => {

    const loc = useLocation()
    let [data, setData] = useState()
    let [total, setTotal] = useState()
    let [charge, setCharge] = useState()
    let [hide, setHide] = useState(false)


    async function getData() {
        let data = await fetch(`https://stg.dhunjam.in/account/admin/${sessionStorage.getItem("code") ? JSON.parse(sessionStorage.getItem("code")) : loc.state.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        let res = await data.json()

        console.log(res)

        setData(res.data)
        setCharge(res.data.charge_customers)
        setTotal(res.data.amount)
    }

    const navigate = useNavigate()


    useEffect(() => {
        if (!sessionStorage.getItem("code")) navigate("/")
        else getData()
    }, [])





    return (
        <>
            <div style={{ flexDirection: "column" }} className='flex justify-center items-center text-center min-h-[100vh]'>
                <h1 className='text-white text-[32px]'>{data ? data.name : null}, {data ? data.location : null} on Dhun Jam</h1>
                <div className='flex mt-4'>
                    <div className='w-[18rem]'>
                        <p className='text-white text-left text-[16px]'>Do you want to charge your totalers for requesting songs?</p>
                    </div>
                    <div className='flex space-x-8 justify-center mt-4 w-[20rem]'>
                        <div>
                            <input onChange={() => {
                                setCharge(true)
                            }} type="radio" name="opinion" checked={charge} value="yes" />
                            <label className='text-white ml-2' for="html">Yes</label>
                        </div>
                        <div>
                            <input onChange={() => {
                                console.log("HEllo")
                                setCharge(false)
                            }} type="radio" name="opinion" checked={!charge} value="no" />
                            <label className='text-white ml-2' for="css">No</label>
                        </div>
                    </div>
                </div>
                <div className='flex mt-8'>
                    <div className='w-[18rem]'>
                        <p className='text-white text-left text-[16px]'>total song request amount -</p>
                    </div>
                    <div className='w-[20rem]'>
                        <input disabled={!charge} onChange={(e) => {
                            if (e.target.value < 99) {
                                setHide(true)
                            } else {
                                setHide(false)
                            }

                            setTotal(preValue => ({
                                ...preValue,
                                category_6: parseInt(e.target.value)
                            }))
                        }} className={`px-2 ${!charge ? "bg-[#C2C2C2]" : "bg-transparent"} text-white py-1 w-[16rem] rounded-md border-[1px] border-gray-400`} type="text" value={total ? total.category_6 : null} />
                    </div>
                </div>
                <div className='flex mt-8'>
                    <div className='w-[18rem]'>
                        <p className='text-white text-left text-[16px]'>Regular songs request amounts, from high to low -</p>
                    </div>
                    <div className='flex space-x-3 justify-center w-[20rem]'>
                        {total ? Object.keys(total).map((item) => {
                            return item !== "category_6" ? <input disabled={!charge} onChange={(e) => {

                                if (item === "category_7") {
                                    if (e.target.value < 79) {
                                        setHide(true)
                                    } else {
                                        setHide(false)
                                    }
                                }

                                else if (item === "category_8") {
                                    if (e.target.value < 59) {
                                        setHide(true)
                                    } else {
                                        setHide(false)
                                    }
                                }

                                else if (item === "category_9") {
                                    if (e.target.value < 39) {
                                        setHide(true)
                                    } else {
                                        setHide(false)
                                    }
                                }

                                else if (item === "category_10") {
                                    if (e.target.value < 19) {
                                        setHide(true)
                                    } else {
                                        setHide(false)
                                    }
                                }

                                setTotal(preValue => ({
                                    ...preValue,
                                    [item]: parseInt(e.target.value)
                                }))
                            }} className={`${!charge ? "bg-[#C2C2C2]" : "bg-transparent"} w-[3.5rem] h-[2rem] text-white px-2 rounded-md border-[1px] border-gray-400`} type="number" min={99} maxLength={3} pattern={3} value={total ? total[item] : null} /> : null
                        }) : null}
                    </div>
                </div>
                <div className={`${!charge ? "hidden" : null}`}>
                    <Bars data={total ? Object.values(total) : null} />
                </div>
                <div className={`w-[30%] ${!charge ? "my-8" : null}`}>
                    <button onClick={async () => {
                        let data = await fetch(`https://stg.dhunjam.in/account/admin/${sessionStorage.getItem("code") ? JSON.parse(sessionStorage.getItem("code")) : loc.state.id}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                amount: total
                            })
                        })

                        let res = await data.json()

                        alert(res.response)

                    }} disabled={hide || !charge} className={`text-white text-[16px] py-2 rounded-md ${hide || !charge ? "bg-[#C2C2C2]" : "bg-[#6741D9]"} w-full`}>Save</button>
                </div>
            </div>
        </>
    )
}

export default Admin