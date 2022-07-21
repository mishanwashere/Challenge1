export interface ApiGetArtistTracklistResponseModel {
    data: ApiTracklist[],
    total: number,
    error?: ApiErrorResponseModel,
}

export interface ApiErrorResponseModel {
    code: number,
    message: string,
    type: string,
}

export interface ApiTracklist {
    album: Album,
    artist: Artist,
    contributors: Contributors[],
    duration: number,
    explicit_content_cover: number,
    explicit_content_lyrics: number,
    explicit_lyric: boolean,
    id: number,
    link: string,
    md5_image: string,
    preview: string,
    rank: number,
    readable: boolean,
    title: string,
    title_short: string,
    title_version: string,
    type: string,
}

export interface Album {
    cover: string,
    cover_big: string,
    cover_medium: string,
    cover_small: string,
    cover_xl: string,
    id: number,
    md5_image: string,
    title: string,
    tracklist: string,
    type: string,
}

export interface Artist {
    id: number,
    name: string,
    tracklist: string,
    type: string,
}

export interface Contributors {
    id: number,
    link: string,
    name: string,
    picture: string,
    picture_big: string,
    picture_medium: string,
    picture_small: string,
    picture_xl: string,
    radio: boolean,
    role: string,
    share: string,
    tracklist: string,
    type: string,
}