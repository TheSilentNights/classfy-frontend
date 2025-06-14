import axios, { formToJSON } from 'axios'
import { defineStore } from 'pinia'
import sendGet from '../js/Request'

export const backendUrlStorge = defineStore('backendUrlStorge', {
	state: () => ({
        url: 'http://127.0.0.1:7777',
        linked: false
    }),
    getters:{
        getUrl(state){
            return state.url
        },
        getLinkedStatus(state){
            return state.linked
        }
    },
    actions:{
        connected(){
            this.linked = true
        },
        disconnected(){
            this.linked = false
        },
        async testConnection() {
            const result = await sendGet(this.url + '/api/health') //等待结果
            console.log(result)
            if(result.data.status == "success"){
                this.linked = true
            }else{
                this.linked = false
            }
        }
    }
})

function check(imageUrl) {
	if (imageUrl.type == 'image/jepg' || imageUrl.type == 'image/png') {
		return true
	}
	return false
}
