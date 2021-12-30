export async function renderProfileByUserName(queryUser: String) {
    try {
        const data = await fetch(`http://localhost:3000/api/profile/${queryUser}`)
        return data
    }
    catch (err) {
        console.log("Could not fetch the data from the database")
    }
}  

export async function createProfileFromSignUp(firstName: string, lastName: string, userName: string, email: string, password: string, accountCreated: Date) {
    try {
        const data = await fetch(`http://localhost:3000/api/profile`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({firstName, lastName, userName, email, password, accountCreated, })
        })  
        return data
    }
    catch (err) {
        console.log("Could not create the data from the database")
    }
}

export async function deleteUserProfile(userId: number) {
    try {
        const data = await fetch(`http://localhost:3000/api/profile`, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userId)
        })
        return data
    }
    catch (err) {
        console.log("Could not delete the user from the database")
    }
}