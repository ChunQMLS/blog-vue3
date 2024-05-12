export interface GalleryRes {
    url: string,
    width: number,
    height: number,
    orders: number
}

export interface Gallery {
    id:string,
    title: string,
    preview: string,
    total: number,
    imageRes: GalleryRes[]
}

export interface WaterfallData {
    height: number,
    width:number
    data:any
}

export interface WaterfallList {
    height: number,
    waterfallDatas: WaterfallData[]
}