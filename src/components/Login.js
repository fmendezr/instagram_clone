import React, { useRef, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError]  = useState(true);
    const [loading, setLoading] = useState(false);
    const { logIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError(false);
            setLoading(true);
            await logIn(emailRef.current.value, passwordRef.current.value);
            navigate("/")
        } catch {
            setError("Failed to sign in");
        }
        setLoading(false)
    }

    return (
        <>
        <div>
            <h1>Log In</h1>
            <Form onSubmit={handleSubmit}>
                <input placeholder='Email' type='email' ref={emailRef} required></input>
                <input placeholder='Password' type='password' ref={passwordRef} required></input>
                <button type='submit' disabled={loading}>Submit</button>
            </Form>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
        <div>
            Need an account? <Link to="/signup">Sign Up</Link> 
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