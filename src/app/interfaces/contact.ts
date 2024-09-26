export interface ContactInterface {
    name: {
        first?: string,
        last?: string
    };
    birthdate?: number;
    address: {
        street?: string,
        zip?: number,
        city?: string
    }
}
