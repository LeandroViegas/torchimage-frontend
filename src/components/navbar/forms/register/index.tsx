import React from 'react'
import { GrClose } from 'react-icons/gr'
import './index.css'
import Api from '../../../../services/api'

interface MyProps {
    close: (sl: boolean, sr: boolean) => any
}

interface MyState {
    close: (sl: boolean, sr: boolean) => any,
    input: {
        user: string,
        email: string,
        password: string
    }
    inputVerify: { user: boolean | undefined, email: boolean | undefined }
}

class Register extends React.Component<MyProps, MyState> {

    constructor(props: any) {
        super(props);
        this.state = {
            close: props.close,
            input: {user: "", email: "", password: ""},
            inputVerify: { user: undefined, email: undefined }
        }
    }

    render() {

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            this.setState({ ...this.state, inputVerify: { email: undefined, user: undefined } })
            Api.post("/users", { mail: this.state.input.email, user: this.state.input.user, password: this.state.input.password }).then((response) => {
                if (response.data?.user?.user) {
                    localStorage.setItem("user", JSON.stringify({ email: response.data?.user.mail, username: response.data?.user.user }))
                    document.location.reload(true)
                } else {
                    this.setState({ ...this.state, inputVerify: { user: response.data?.verify?.user, email: response.data?.verify?.mail } })
                    console.log(this.state)
                }
            })
        }


        return (
            <div style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} className="fixed container z-50">
                <div className="bg-white z-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                    <div>
                        <button className="float-right" onClick={() => this.state.close(false, false)}>
                            <GrClose />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-orange-700 text-sm font-bold mb-2" htmlFor="user">
                                User
                            </label>
                            <input onChange={e => this.setState({...this.state, input: {...this.state.input, user: e.target.value}})} className="shadow border rounded w-full py-2 px-3 text-gray-800" id="user" type="user" placeholder="User" />
                            <p className="text-red-400 text-xs italic">{this.state.inputVerify.user === false ? "This user name is in use." : ""}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-orange-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input onChange={e => this.setState({...this.state, input: {...this.state.input, email: e.target.value}})}  className="shadow border rounded w-full py-2 px-3 text-gray-800" id="email" type="email" placeholder="Email" />
                            <p className="text-red-400 text-xs italic">{this.state.inputVerify.email === false ? "This email is in use." : ""}</p>
                        </div>
                        <div className="mb-6">
                            <label className="block text-orange-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input onChange={e => this.setState({...this.state, input: {...this.state.input, password: e.target.value}})}  className="shadow border rounded w-full py-2 px-3 text-gray-800 mb-3" id="password" type="password" placeholder="Password" />
                            {/* <p className="text-red-400 text-xs italic">{"Please choose a password."}</p> */}
                        </div>
                        <div className="flex items-center justify-between">
                            <button type="submit" className="bg-orange-600 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register