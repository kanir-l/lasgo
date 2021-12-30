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

export interface PicksInterface {
    thisAndthat: {
        thisAndthat: ThisAndThatInterface
    }
    picked: string
}

export interface ThisAndThatInterface {
    this: string,
    that: string
}
