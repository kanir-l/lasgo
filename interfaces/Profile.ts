export interface ProfileInterface {
    image: string,
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
    about: string,
    accountCreated: Date,
    tokenExpiration: Date,
    myChallenges: [],
    myAcknowledgements: []
}