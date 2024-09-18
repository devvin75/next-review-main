import Heading from "../components/Heading";

export const metadata = {
    title: 'About',
    description: 'Learn about this website'
}

export default function About(){
    return(
        <>
        <Heading>About</Heading>
        <p>A website created to learn Next.js</p>
        </>
    )
}