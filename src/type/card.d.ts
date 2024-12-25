export interface ICardBHYT {
    uuid?: string
    id: string
    name: string
    dob: string
    gender: string
    iplace: string
    issue_date: string
    type: string
    expire_date: string
    ihos: string

}
export interface ICardBHYTCreate {
    id: string
    name: string
    dob: string
    gender: string
    iplace: string
    issue_date: string
    type: string
    expire_date: string
    ihos: string
    is_valid: boolean
    images: string
    user: number
}
export interface ICardGPLX {
    uuid?: string
    id: string
    name: string
    dob: string
    iplace: string
    origin_place: string
    issue_date: string
    type: string
    expire_date: string
    nationality: string
    level: string
    user: number

}
export interface ICardGPLXCreate {
    name: string
    dob: string
    id: string
    iplace: string
    origin_place: string
    issue_date: string
    expire_date: string
    nationality: string
    level: string
    type: string
    is_valid: boolean
    images: string
    user: number

}
export interface ICardCCCD {
    uuid: string
    id: string
    name: string
    dob: string
    gender: string
    origin_place: string
    current_place: string
    issue_date: string
    type: string
    expire_date: string
    nationality: string
    personal_identifi: string
    user: number
}
export interface ICardCCCDBehind {
    issue_date: string
    id_ : string
    personal_identifi: string
}

export interface ICardCCCDCreate {
    id: string
    name: string
    dob: string
    gender: string
    origin_place: string
    current_place: string
    issue_date: string
    type: string
    expire_date: string
    nationality: string
    is_valid: boolean
    personal_identifi: string
    images: string
    images_behind: string
    user: number
}
export interface ICardBHYT {
    uuid: string
    id: string
    name: string
    dob: string
    gender: string
    iplace: string
    issue_date: string
    type: string
    expire_date: string
    ihos: string
    user: number

}
export interface ICard {
        uuid: string
        type: string; 
        name: string;
        id: string;
        dob: string; 
        gender: string; 
        expire_date: string; 
        issue_date: string; 
      
        // Specific to BHYT
        iplace?: string; 
        ihos?: string; 
      
        // Specific to CCCD
        current_place?: string; 
        nationality?: string; 
        origin_place?: string; 
      
        level: string;
        user: number

}