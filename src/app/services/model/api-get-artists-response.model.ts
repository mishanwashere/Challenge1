export interface ApiGetArtistsResponseModel {
    id: number,
    link: string,
    name: string,
    nb_album: number,
    nb_fan: number,
    picture: string,
    picture_big: string,
    picture_medium: string,
    picture_small: string,
    picture_xl: string,
    radio: boolean,
    share: string,
    tracklist: string,
    type: string,
    error?: ApiErrorResponseModel,
}

export interface ApiErrorResponseModel {
    code: number,
    message: string,
    type: string,
}