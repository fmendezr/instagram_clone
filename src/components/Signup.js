import React, { useState } from 'react'
import styled from 'styled-components'

export default function Signup() {

    const [error, setError]  = useState(true)

    return (
        <>
        <div>
            <h1>Sign Up</h1>
            <Form>
                <input placeholder='Email' type='email'></input>
                <input placeholder='Password' type='password'></input>
                <input placeholder='Confirm password' type='password'></input>
                <button type='submit'>Submit</button>
            </Form>
            {error && <ErrorMessage></ErrorMessage>}
        </div>
        <div>
            Already have an account? Log in 
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