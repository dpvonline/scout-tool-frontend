export interface RegisterBasics {
    username: string,
    password: string,
    repeatPassword: string,
    email: string
}

export interface RegisterScoutDetails {
    scoutName: string,
    scoutOrganisation: number,
    bundespost: string,
    leader: string,
    scoutLevel: string
}

export interface RegisterPersonalDetails {
    mobileNumber: number,
    dsgvoConfirmed: boolean,
    emailNotification: string,
    smsNotification: boolean,
    firstName: string,
    lastName: string,
    address: string,
    addressSupplement: string,
    zipCode: number,
    gender: string,
    birthDate: string
}