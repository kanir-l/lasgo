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

export async function logOutUser() {
    try {
        const data = await fetch(`http://localhost:3000/api/auth/logout`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })  
        return data
    }
    catch (err) {
        console.log("Could not login")
    }
} 
   
