import { useState } from "react"
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "./loginSlice";
import { Header, Main, Section, Footer } from "../../components"

import resourceStyles from '../resourceStyles.module.css'

export const Login = () => {
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation();

    const [state, setState] = useState({
        email: "",
        password: ""
    });

    const handleInput = function ({ target }) {
        const { name, value } = target
        setState({
            ...state,
            [name]: value
        })
    }

    const handleKeyDown = function ({ key }) {
        if (key === 'Enter') {
            handleSubmit()
        }
    }

    const handleSubmit = async () => {
        const { email, password } = state;
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        try {
            await login(formData).unwrap()
            navigate("/docket")
        } catch (error) {
            // TODO: create proper error message
        }
    }

    const links = ["signup"]

    return (
        <>
            <Header links={links} />
            <Main>
                <Section>
                    <div className={resourceStyles.fullpage}>
                    <form className={resourceStyles.form}>
                        <h1 className="">Please log in</h1>
                        <div>
                            <div className={resourceStyles.labelledTextInput}>
                                <label htmlFor="email">Enter your email:</label>
                                <input type="email"
                                    name="email"
                                    id="email"
                                    onChange={handleInput}
                                    className=""
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                            <div className={resourceStyles.labelledTextInput}>
                                <label htmlFor="password">Enter your password:</label>
                                <input type="password"
                                    name="password"
                                    className=""
                                    id="password"
                                    placeholder="Password"
                                    onChange={handleInput}
                                    onKeyDown={handleKeyDown}
                                    required
                                />
                            </div>
                        </div>
                        <button className="" type="button" onClick={handleSubmit}>Sign in</button>
                    </form>
                    </div>
                </Section>
            </Main>
            <Footer />
        </>
    )
}