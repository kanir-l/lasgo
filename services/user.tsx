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

export async function updateProfileWithImage(file: File, currentUserId: number) {
    return new Promise((resolve, reject) => {
        try {
            // Make another FileReader Class
            const reader = new FileReader()
            // config our own fileReader's function
            reader.onloadend = async () => {
                const image = reader.result
                const data = await fetch(`http://localhost:3000/api/profile`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({file: image, currentUserId: currentUserId})
                })
                resolve(data)
            }
            reader.onerror = (err) => {
                console.error('There was an issue', {err})
                reject('Couldn\'t read file')
            }
            /// Run another fileReader's function to tranform file to url
            reader.readAsDataURL(file)
        }
        catch (err) {
            console.log("Could not update the profile with the image", err)
            reject("Could not update the profile with the image")
        }
    })
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

export async function renderAllChallenges() {
    try {
        const data = await fetch(`http://localhost:3000/api/challenges`)
        return data
    }
    catch (err) {
        console.log("Could not fetch the data from the database")
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

export async function updateAcknowledgementByIdWithNewPick(acknowledgementId: number, picked: string) {
    try {
        const data = await fetch(`http://localhost:3000/api/acknowledgements`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({acknowledgementId, picked})
        })
        return data
    }
    catch (err) {
        console.log("Could not update acknowledgement")
        return err
    }
}

export async function readAllAcknowledgements() {
    try {
        const data = await fetch(`http://localhost:3000/api/acknowledgements`)
        return data
    }
    catch (err) {
        console.log("Could not fetch the data from the database")
    }
}  



