export interface JwtPayload {
    id: number;
    phoneNumber: string;
    iat?: Date;
}
