import React, { useRef, useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [error, setError]  = useState(true);
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();
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
            navigate("/")
        } catch {
            setError("Failed to create an account");
            setLoading(false);
        }
        setLoading(false)
    }

    return (
        <Main>
        <Container>
            <Title>Sign Up</Title>
            <Form onSubmit={handleSubmit}>
                <Section>
                    <Label>Email</Label>
                    <Input placeholder='Email' type='email' ref={emailRef} required/>
                </Section>
                <Section>
                    <Label>Password</Label>
                    <Input placeholder='Password' type='password' ref={passwordRef} required />
                </Section>
                <Section>
                    <Label>Confirm Password</Label>
                    <Input placeholder='Confirm password' type='password' ref={confirmPasswordRef} required />
                </Section>
                <Button type='submit' disabled={loading}>Submit</Button>
            </Form>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </Container>
        <Container>
            Already have an account? <Link to="/login">Log In</Link>
        </Container>
        </Main>
  )
}

const Main = styled.main`
Background: red;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    top: 50%:
`

const Title = styled.h1`
    font-size: 2rem;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width:  90%;
    max-width: 250px;;
    padding: 1rem;
    top: 50%;
    left: 50%;
`

const Section =   styled.section`
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
`

const Input = styled.input`
`

const ErrorMessage  = styled.p`
`

const Button = styled.button`
`