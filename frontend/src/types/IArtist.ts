export interface IArtistWithCounts extends IArtist {
    albumCount?: number;
    trackCount?: number;
}

export interface IArtist {
    id: string;
    name: string;
    genres?: string[];
    activeSince: string;
}