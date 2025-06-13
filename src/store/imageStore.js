import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useImageUrlStore = defineStore('imageUrl', {
	state: () => {
		return {
			url: '../../public/vite.svg',
		}
	},
	getters: {
		getUrl: (state) => state.url,
	},
    actions:{
        setUrl(targetUrl){
            
        }
    }
})

function check(imageUrl){
    if(imageUrl.type ==  'image/jepg' || imageUrl.type == 'image/png'){
        return true
    }
    return false
}
