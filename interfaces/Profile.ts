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
        ThisAndThatInterface
    ],
    myAcknowledgements: [
        PicksInterface
    ]
}

export interface ThisAndThatInterface {
    _id: number,
    this: string,
    that: string
}

export interface PicksInterface {
    thisAndthat: {
        thisAndthat: ThisAndThatInterface
    }
    picked: string
}