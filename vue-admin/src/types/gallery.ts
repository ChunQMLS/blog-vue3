// 图库
export interface CreateGallery {
    title: string
}

export interface ImageInfo {
    belong: string,
    url: string,
    width: number,
    height: number,
}

export interface ImageRes extends ImageInfo {
    id: string,
    orders: number
}

export interface Gallery extends CreateGallery {
    id: string,
    total: number,
    imageRes: ImageRes[]
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

export interface UploadProgress {
    filename: string,
    percent: number
}
