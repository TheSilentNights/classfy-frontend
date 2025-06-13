import { defineStore } from 'pinia'

const backendUrlStorge = defineStore('backendUrlStorge', {
	state: () => {
		return {
			url: '',
			linked: false,
		}
	},
    getters:{
        getUrl(state){
            return state.url
        },
        getLinkedStatus(state){
            return state.linked
        }
    },

    actions:{
        connected:()=>{
            this.state.linked = true
        },
        disconnected:()=>{
            this.state.linked = false
        }
    }
})

function check(imageUrl) {
	if (imageUrl.type == 'image/jepg' || imageUrl.type == 'image/png') {
		return true
	}
	return false
}
