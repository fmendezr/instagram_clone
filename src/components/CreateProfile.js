import { useState } from "react"
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { useDB } from "../contexts/DBContext";

export default function CreateProfile (props) {

    const [username, setUsername] = useState("");
    const [firstName, setFirstName]  = useState("");
    const [lastName, setLastName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false);

    const {changeDisplayName, currentUser}  = useAuth();
    const {introduceNewUser} = useDB();

    const handleSubmit = (e) => {
        e.preventDefault();
        props.changeState(username);
        changeDisplayName(username);
        introduceNewUser(currentUser.uid, username, firstName, lastName, description);
    }

    return (
    <Background>
        <Form onSubmit={handleSubmit}>
            <Section>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" placeholder="Patrick_Bateman" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            </Section>
            <Section>
                <Label htmlFor="firstName">First Name</Label>
                <Input type="text" id="firstName" placeholder="Patrick" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
            </Section>
            <Section>
                <Label htmlFor="lastName">Last Name</Label>
                <Input type="text" id="lastName" placeholder="Bateman" value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
            </Section>
            <Section>
                <Label htmlFor="description">Description</Label>
                <TextArea id="description" placeholder="    I live in the American Gardens Building on West 81st Street on the 11th floor. My name is Patrick Bateman. I’m 27 years old. I believe in taking care of myself, and a balanced diet and a rigorous exercise routine." value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
            </Section>
            <Button type="submit">Submit</Button>
            {error !== false ? <Error value={error} />  : null }
        </Form>
    </Background>)
}

const Background = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top:  0;
    right: 0;
    bottom:  0;
    left:  0;
    Background: white;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width:  90%;
    max-width: 250px;
    border: 1px solid gray;
    border-radius: 5%;
    padding: 1rem;
    top: 50%;
    left: 50%

`

const Icon = styled.img`
    width: 1.5rem;
    position: relative;
    left: 89%
`

const Section =   styled.section`
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
`

const Input = styled.input`
`

const TextArea = styled.textarea`
    height: 3rem;
`

const Button = styled.button`
`

const Error =  styled.p`
    color: red
`