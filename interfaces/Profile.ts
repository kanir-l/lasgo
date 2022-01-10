export interface SignUpInterface { 
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
    accountCreated: Date
}

export interface ProfileInterface {
    _id: number,
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
    accountCreated: Date,
    about: string,
    image: string,
    tokenExpiration: Date,
    myChallenges: [
        ChallengeInterface
    ],
    myAcknowledgements: [
        AcknowledgementInterface
    ]
}

export interface ChallengeInterface {
    _id: number,
    challengeThis: string,
    challengeThat: string,
    created: Date,
    byUser: number
}

export interface AcknowledgementInterface {
    _id: number,
    challenge: ChallengeInterface
    picked: string
}