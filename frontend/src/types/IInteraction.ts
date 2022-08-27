import { ITrack } from "./ITrack";
import { IUser } from "./users";

export interface IInteraction {
    id: string
    trackId?: string;
    userId?: string;
    isLiked: boolean;
    playCount: number;
    createdAt: Date;
    updatedAt: Date;
    track?: ITrack;
    user?: IUser;
}