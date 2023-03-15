import React, { useRef, useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useDB } from '../contexts/DBContext';

export default function Signup() {

    const usernameRef = useRef()
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [error, setError]  = useState(true);
    const [loading, setLoading] = useState(false);
    const { signUp, currentUser, changeDisplayName } = useAuth();
    const { introduceNewUser } = useDB();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordRef.current.value !== confirmPasswordRef.current.value){
            setLoading(false);
            return setError("Passwords do not match");
        }   
        try {
            setError(false);
            setLoading(true)
            await signUp(emailRef.current.value, passwordRef.current.value);
            await changeDisplayName(usernameRef.current.value);
            await introduceNewUser(currentUser.uid, usernameRef.current.value);
            navigate("/")
        } catch {
            setError("Failed to create an account");
            setLoading(false);
        }
        setLoading(false)
    }

    return (
        <>
        <div>
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
                <input placeholder='Username' type="text" ref={usernameRef} required></input>
                <input placeholder='Email' type='email' ref={emailRef} required></input>
                <input placeholder='Password' type='password' ref={passwordRef} required></input>
                <input placeholder='Confirm password' type='password' ref={confirmPasswordRef} required></input>
                <button type='submit' disabled={loading}>Submit</button>
            </Form>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
        <div>
            Already have an account? <Link to="/login">Log sIn</Link>
        </div>
        </>
  )
}

const Form  = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 250px;
`

const ErrorMessage = styled.p`
    color: red;
`