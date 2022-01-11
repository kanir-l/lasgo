export async function logInToProfile(userName: string, password: string) {
    try {
        const data = await fetch(`http://localhost:3000/api/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userName, password})
        })  
        return data
    }
    catch (err) {
        console.log("Could not login")
    }
}