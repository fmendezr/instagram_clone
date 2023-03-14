import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import settingsLogo from "../images/settingsLogo.svg"


export default function CurrentUserProfile () {
    
    const {currentUser} = useAuth();

    return (
        <TopContainer>
            <ImageContainer></ImageContainer>
            <PersonalInformation>
                <Row>
                    {currentUser.displayName}
                    <Button>Edit Profile</Button>
                    <Icon src={settingsLogo} alt="settings"/>
                </Row>
                <Row>
                    <p>Posts</p>
                    <p>Followers</p>
                    <p>Following</p>
                </Row>
            </PersonalInformation>
        </TopContainer>
    )
}

const TopContainer = styled.div`
    display: flex;
`
const ImageContainer = styled.div`
`

const PersonalInformation = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: inherit;
`
const Row = styled.div`
    display: flex;
    gap: 0.75rem;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
`

const Button = styled.button`
    font-size: 1rem;
`

const Icon = styled.img`
    height: 2rem;
`