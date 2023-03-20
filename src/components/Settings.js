import { useEffect, useState } from "react";
import { json, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { useDB } from "../contexts/DBContext";

export default function Settings (props) {

    const location = useLocation();
    const { from } = location.state;

    const { currentUser, changeDisplayName, updatePhoneNumber, sendVerificationEmail } = useAuth();
    const { getUserInfo, updateUserInfo } = useDB();

    const [loading, setLoading] = useState(false);

    const [displayProfile, setDisplayProfile] = useState(from === "profile" ? true : false );
    const [displayAccount, setDisplayAccount] = useState(from === "account" ? true : false );

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [description, setDescription] = useState("");

    const [email, setEmail] = useState("");
    const [verifiedEmail, setVerifiedEmail] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleClick = (e) =>  {
        e.preventDefault();
        if (e.target.name === "profile"){
            setDisplayProfile(true);
            setDisplayAccount(false);
        } else {
            setDisplayProfile(false);
            setDisplayAccount(true);
        }
    }

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateUserInfo(currentUser.uid, username, firstName, lastName, description);
        changeDisplayName(username);
        setLoading(false);
    }

    const handleAccountSubmit = (e) => {
        e.preventDefault();
        updatePhoneNumber(phoneNumber);
        sendVerificationEmail();
    }

    useEffect(() => {
        const getUserData = async () => {
            const rawUserData = await getUserInfo(currentUser.uid);
            const userData = rawUserData.data();
            setUsername(userData.displayName);
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            setDescription(userData.description);
        }
        getUserData();
    }, []);

    if (displayAccount === true){
        return (
            <Container>
                <Navbar>
                    <Button name="profile" onClick={handleClick}>Edit Profile</Button>
                    <Button name="account" onClick={handleClick}>Edit Account</Button>
                </Navbar> 
                <Form>
                    <p>{currentUser.displayName}</p>
                    <Section>
                        <Label>Email</Label>
                        <Input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    </Section>
                    <Section>
                        <Label>Verify Email</Label>
                        <Button >{verifiedEmail === true ? "verified" : "send verification" }</Button>
                    </Section>
                    <Section>
                        <Label>Phone Number</Label>
                        <Input type="phone" value={phoneNumber} onChange={(e) => {setPhoneNumber(e.target.value)}}/>
                    </Section>
                    <SubmitButton type="submit" disabled={loading}>Submit</SubmitButton>
                </Form>
            </Container>
        )
    }

    return (
    <Container>
        <Navbar>
            <Button name="profile" onClick={handleClick}>Edit Profile</Button>
            <Button name="account" onClick={handleClick}>Edit Account</Button>
        </Navbar>
            <FormContainer>
                <Form>
        
                </Form>
            </FormContainer>
            <Form onSubmit={handleProfileSubmit}>
                <Section>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" type="text" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                </Section>
                <Section>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" type="text" value={firstName} onChange={(e) => {setFirstName(e.target.value)}}/>
                </Section>
                <Section>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" type="text" value={lastName} onChange={(e) => {setLastName(e.target.value)}}/>
                </Section>
                <Section>
                    <Label htmlFor="description">Bio</Label>
                    <Textarea id="description" value={description} onChange={(e) => {setDescription(e.target.value)}}/>
                </Section>
                <SubmitButton type="submit" disabled={loading}>Submit</SubmitButton>
            </Form>
    </Container>
    )
}

const Container = styled.div`
    display: flex;
`

const Navbar = styled.div`
    display: flex;
    flex-direction: column;
`

const Button = styled.button`
`

const FormContainer = styled.div`
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Section = styled.section`
    display: flex;
`

const Label = styled.label`
`

const Input = styled.input`
`

const Textarea = styled.textarea`
`

const SubmitButton = styled.button`
`