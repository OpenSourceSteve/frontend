import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

import { useSignupMutation } from "./signupSlice";
import { Footer, Header } from "../../components"

import styles from './Signup.module.css'

export const Signup = () => {
    const [state, setState] = useState({ agreed: false });

    const navigate = useNavigate();

    const [signup, { isLoading }] = useSignupMutation();

    const handleInput = function ({ target }) {

        const { checked, name, type, value } = target;
        setState({
            ...state,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    const handleSubmit = async () => {
        const { firstName, lastName, phone, email, password } = state;
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("phone", phone);
        formData.append("email", email);
        formData.append("password", password);
        try {
            // await dispatch(signup(formData)).unwrap();
            await signup(formData).unwrap()
            navigate("/login");
        } catch (error) {
            // TODO: create proper error message
        }
    }

    const links = ["login"]

    return (
        <>
            <Header links={links} />
            <main className={styles.main} >
                <section className={styles.section}>
                    <form className={styles.form}>
                        <h1 className="">Please enter your information</h1>
                        <div>
                            <div className={styles.labelledTextInput}>
                                <label htmlFor="firstName">Enter your first name:</label>
                                <input type="text" name="firstName" className="form-control first" id="firstName" onChange={handleInput} placeholder="John" required />
                            </div>
                            <div className={styles.labelledTextInput}>
                                <label htmlFor="lastName">Enter your last name:</label>
                                <input type="text" name="lastName" className="form-control" id="lastName" onChange={handleInput} placeholder="Smith" required />
                            </div>
                            <div className={styles.labelledTextInput}>
                                <label htmlFor="phone">Enter your phone number:</label>
                                <input type="phone" name="phone" className="form-control" id="phone" onChange={handleInput} placeholder="(555)555-5555" required />
                            </div>
                            <div className={styles.labelledTextInput}>
                                <label htmlFor="email">Enter your email:</label>
                                <input type="email" name="email" id="email" className="form-control" onChange={handleInput} placeholder="name@example.com" required />
                            </div>
                            <div className={styles.labelledTextInput}>
                                <label htmlFor="password">Enter your password:</label>
                                <input type="password" name="password" className="form-control last" id="password" placeholder="Password" onChange={handleInput} required />
                            </div>
                        </div>
                        <div className={styles.labelledCheckbox}>
                        <input type="checkbox" name="agreed" checked={state.agreed} onChange={handleInput} id="agreement" />
                            <label htmlFor="agreement">I agree to the <Link to="/terms">terms and conditions.</Link></label>
                        </div>
                        <button className={`w-100 btn btn-lg btn-primary ${state.agreed ? '' : 'disabled'}`} type="button" onClick={handleSubmit}>Sign up</button>
                        <p className="mt-5 mb-3 text-body-secondary">&copy; 2023</p>
                    </form>
                </section>
            </main>
            <Footer />
        </>
    )
}