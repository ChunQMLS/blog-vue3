export function getIdsFromList(list:any[]):string[]{
    const result = list.map( i => {
        return i.id
    })
    return result.length > 0 ? result : []
}

export function getDiffDay(date_1:string,date_2:string):number {

    let myDate_1 = Date.parse(date_1)
    let myDate_2 = Date.parse(date_2)

    let diffDate = Math.abs(myDate_1 - myDate_2)

    let totalDays = Math.floor(diffDate / (1000*3600*24))

    return totalDays
}

// 上传文件队列
class FileQueue {

    public queue: File[]
    public uploadingCount: number
    public maxUploadingCount: number
    public uploadFunc:Function

    constructor(uploadFunc:Function) {
        this.queue = []
        this.uploadingCount = 0
        this.maxUploadingCount = 4
        this.uploadFunc = uploadFunc
    }
    addFile(file:File) {
        console.log('添加')
        this.queue.push(file)
        this.uploadFiles()
    }
    async uploadFiles() {
        console.log('循环外',this.uploadingCount,this.maxUploadingCount,this.queue.length)
        while (this.uploadingCount < this.maxUploadingCount && this.queue.length > 0) {
            console.log('循环内',this.uploadingCount,this.maxUploadingCount,this.queue.length)
            const file = this.queue.shift()
            if (file) {
                const uploadPromise = this.uploadFile(file)
                .then(() => {
                    this.uploadingCount--
                })
                .catch((err) => {
                    console.error('Failed to upload file:', file.name, err)
                    this.uploadingCount--
                })
                this.uploadingCount++
                await uploadPromise
            }
        }
    }
    async uploadFile(file:File) {
        // 这里写具体的上传逻辑，可以使用fetch、XMLHttpRequest等方法
        await this.uploadFunc(file)
  }
}

export default FileQueue