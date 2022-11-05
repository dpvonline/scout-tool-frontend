export interface RegisterBasics {
    username: string,
    password: string,
    repeatPassword: string,
    email: string
}

export interface RegisterScoutDetails {
    scoutName: string,
    scoutOrganisation: number,
    scoutLevel: '' | 'Wölfling' | 'Sippling' | 'Rover*in'
}

export interface RegisterPersonalDetails {
    mobileNumber: string,
    dsgvoConfirmed: boolean,
    emailNotification: 'Alles' | 'Täglich' | 'Wöchentlich' | 'Nur wichtiges',
    smsNotification: boolean,
    firstName: string,
    lastName: string,
    address: string,
    addressSupplement: string,
    zipCode: string,
    gender: 'männlich' | 'weiblich' | 'divers' | 'keine Angabe',
    birthDate: string
}