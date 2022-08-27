import { Base } from "src/base.entity";

export class InteractionEntity extends Base {
    trackId: string;
    userId: string;
    isLiked: boolean;
    playCount: number;
}
