<script setup lang="ts">
import { client, ossBase } from '@/utils/alioss'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { v4 } from 'uuid'


const content = defineModel<string>()

defineProps<{onSave?: Function}>()

const onUploadImg = async (files:File[],callback:any) => {
    const res = await Promise.all(
        files.map((file) => {
        return new Promise((rev, rej) => {
            const form = new FormData()
            form.append('file', file)

            const suffix = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
            const UUID:string = v4()
            const fileName = `${UUID.split('-').join('')}` + suffix
            client.put('img/'+fileName, file).then((res:any) => rev(res)).catch((error:any) => rej(error))
            
        })
        })
    )

  callback(res.map((item:any) => ossBase + item.name))
}

</script>

<template>
    <MdEditor 
        v-model="content" 
        @onUploadImg="onUploadImg" @onSave="onSave && onSave()"/>
</template>