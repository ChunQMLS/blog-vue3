export interface Field {
    '--body-background-image':string,
    '--theme-main-color' : string,
    '--theme-second-color' : string,
    '--word-main-color' : string,
    '--word-second-color' : string,
    '--word-third-color' : string,
    '--word-title-color' : string,
    '--border-main-color' : string,
    '--button-main-color' : string,
    '--button-second-color' : string,
    '--fill-main-color' : string,
    '--fill-second-color' : string,
    '--scroll-main-color' : string
}

export interface Theme {
    id: string,
    name: string,
    style: string,
    apply: number
}