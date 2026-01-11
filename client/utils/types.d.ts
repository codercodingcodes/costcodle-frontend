interface UserInfo {
    username:string;
    avatar:string;
    userID:string;
    channelID:string|null;
    guessHistory:GuessHistory;
    [key: string]: unknown;
}
export type GameInfo = {
    image:string;
    price:number;
    date?:number;
    name:string;
    time:number;
    instanceID:string;
}
export type GuessInfo = {
    hGuess:number;
    lGuess:number;
    guessCnt:number;
    completed:boolean;
}
export type GuessHistory = {
    gamesPlayed:number;
    gamesCompleted:number;
    totalGuesses:number;
    firstTries:number;
}
export type UserData = {
    userInfo:UserInfo;
    guessInfo:GuessInfo;
}
export interface UserInfo {}
