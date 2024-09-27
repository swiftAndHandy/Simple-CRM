export interface ContactInterface {
    id?: string,
    name: {
        first?: string,
        last?: string
    }
    mail?: string;
    birthdate?: number;
    address: {
        street?: string,
        zip?: number,
        city?: string
    }
}
