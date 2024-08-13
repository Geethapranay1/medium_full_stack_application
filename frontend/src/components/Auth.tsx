import { Link, useNavigate  } from "react-router-dom";
import { useState } from "react";
import { SignupInput } from "@geethapranay/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
export const Auth =({type} : {type: "signup" | "signin"}) => {
    const navigate = useNavigate()
    const [PostInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, PostInputs)
            if (response.status === 403) {
                return alert(response.data.error)
            }
            const jwt = response.data.jwt;
        
            localStorage.setItem("token", jwt);
            navigate("/blogs")
        }catch (e: any) {
            alert(e.response.data.error)
        }
        
    }
    return <div className="h-screen flex justify-center items-center">
                {/* {JSON.stringify(PostInputs)} */}
                <div className="flex flex-col">
                    <div className="text-3xl font-extrabold px-10">
                        Create an account
                    </div>
                    <div className="text-slate-400 px-10 mb-5">
                        {type === "signin" ? "Don't have an acccount" : "Already have an account? "}
                        <Link className="pl-2 underline" to={type === "signin"? "/signup" : "/signin"}>
                            {type === "signin" ? "Signup" : "Signin" }
                        </Link>
                        
                    </div>
                    <div>
                        {type === "signup" ? <LabelledInput label="Name" placeholder="Geetha pranay" onChange={(e) => {
                                setPostInputs(c => ({
                                    ...c,
                                    name: e.target.value
                                }))
                            }} /> : <></> }
                        
                    </div>
                    <div>
                        <LabelledInput label="Email" placeholder="example@gmail.com" onChange={(e) => {
                                setPostInputs(c => ({
                                    ...c,
                                    email: e.target.value
                                }))
                            }} />
                    </div>
                    <div>
                        <LabelledInput label="Password" type={"password"} placeholder="john1234" onChange={(e) => {
                                setPostInputs(c => ({
                                    ...c,
                                    password: e.target.value
                                }))
                            }} />

                    </div>
                    <div className="mt-5">
                    <button onClick={sendRequest} type="button" className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Signup" : "Signin"}</button>
                    </div>

                    
                </div>
            </div>
        
        
}


interface LabelledInputType {
    label: string,
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void  
    type?: string
}

function LabelledInput({label, placeholder, onChange, type} : LabelledInputType) {
    return <div>
        <div className="mb-2">
            <label  className="block mb-1 text-lg font-bold text-gray-900 dark:text-gray-900">{label}</label>
            <input type={type || "text"} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required/>
        </div>
    </div>
}