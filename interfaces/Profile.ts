export interface SignUpInterface {
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
    accountCreated: Date
}

export interface ProfileInterface {
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
    accountCreated: Date,
    image: string,
    about: string,
    tokenExpiration: Date,
    myChallenges: [],
    myAcknowledgements: []
}