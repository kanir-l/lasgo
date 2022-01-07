//Profiles
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
    // Creating needs to match the property names with model/database
    try {
        const data = await fetch(`http://localhost:3000/api/profile`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({firstName, lastName, userName, email, password, accountCreated })
        })  
        return data
    }
    catch (err) {
        console.log("Could not create the data to the database")
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

//myChallenges
export async function createChallengeFromInput(challengeThis: string, challengeThat: string, created: Date, byUser: number) {
    // Creating needs to match the property names with model/database
    try {
        const data = await fetch(`http://localhost:3000/api/challenges`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({challengeThis, challengeThat, created, byUser})
        })
        return data
    }
    catch (err) {
        console.log("Could not create the challenge to the database")
    }
}

export async function deleteChallengeById(challengeId: number) {
    try {
        const data = await fetch(`http://localhost:3000/api/challenges`, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(challengeId)
        })
        return data
    }
    catch (err) {
        console.log("Could not delete the challenge from the database")
    }
}

//myAcknowledements
export async function createAcknowledgementByPickedChallenge(challenge: number, picked: string, by: number) {
    // Creating needs to match the property names with model/database
    try {
        const data = await fetch(`http://localhost:3000/api/acknowledgements`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({challenge, picked, by})
        })
        return data
    }
    catch (err) {
        console.log("Count not create acknowledgement to the database")
    }
}

export async function deleteAcknowledgementById(acknowledgementId: number) {
    try {
        const data = await fetch(`http://localhost:3000/api/acknowledgements`, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(acknowledgementId)
        })
        return data
    }
    catch (err) {
        console.log("Could not delete the acknowledgement from the database")
    }
}



