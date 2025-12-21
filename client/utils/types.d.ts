interface UserInfo {
    username:string;
    avatar:string;
    userID:string;
    channelID:string|null;
    [key: string]: unknown;
}
export type GameInfo = {
    image:string;
    price:number;
    date?:number;
    name:string;
}
export type GuessInfo = {
    hGuess:number;
    lGuess:number;
    guessCnt:number;
}
export type UserData = {
    userInfo:UserInfo;
    guessInfo:GuessInfo;
}
export interface UserInfo {}
