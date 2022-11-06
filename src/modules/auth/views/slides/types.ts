export interface RegisterBasics {
    username: string,
    password: string,
    repeatPassword: string,
    email: string
}

export interface RegisterScoutDetails {
    scoutName: string,
    scoutOrganisation: string,
    scoutLevel: string//'' | 'Wölfling' | 'Sippling' | 'Rover*in'
}

export interface RegisterPersonalDetails {
    mobileNumber: string,
    dsgvoConfirmed: boolean,
    firstName: string,
    lastName: string,
    address: string,
    addressSupplement: string,
    zipCode: string,
    gender: string,//'männlich' | 'weiblich' | 'divers' | 'keine Angabe',
    birthdate: string
}