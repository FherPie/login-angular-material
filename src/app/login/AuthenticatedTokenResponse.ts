import { UserDTO } from "./UserDto";

export class AuthenticatedTokenResponse{
    token?:string;
    expiry?:string;
    user?: UserDTO;
}