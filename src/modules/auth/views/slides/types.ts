export interface RegisterBasics {
    username: string,
    password: string,
    repeatPassword: string,
    email: string
}

export interface RegisterScoutDetails {
    scoutName: string,
    scoutOrganisation: number,
    scoutLevel: string//'' | 'Wölfling' | 'Sippling' | 'Rover*in'
}

export interface RegisterPersonalDetails {
    mobileNumber: string,
    dsgvoConfirmed: boolean,
    emailNotification: string,//'Alles' | 'Täglich' | 'Wöchentlich' | 'Nur wichtiges',
    smsNotification: boolean,
    firstName: string,
    lastName: string,
    address: string,
    addressSupplement: string,
    zipCode: string,
    gender: string,//'männlich' | 'weiblich' | 'divers' | 'keine Angabe',
    birthdate: string
}