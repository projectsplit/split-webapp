import { PasswordSignInRequest, PasswordSignUpRequest, RefreshTokenResponse, SendGoogleCodeRequest } from '../../types';
export declare const sendGoogleAccessToken: (request: SendGoogleCodeRequest) => Promise<any>;
export declare const sendPasswordCredentials: (request: PasswordSignInRequest) => Promise<any>;
export declare const createPasswordCredentials: (request: PasswordSignUpRequest) => Promise<any>;
export declare const logOut: () => Promise<any>;
export declare const refreshToken: () => Promise<RefreshTokenResponse>;
