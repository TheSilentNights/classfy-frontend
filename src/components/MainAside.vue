<template>
	<div class="aside">
		<div class="row_preview">Preview</div>
		<img :src="getUrl" alt="error"/>
  	</div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useImageUrlStore } from '../store/imageStore'
const imageStore = useImageUrlStore()
const { url, getUrl } = storeToRefs(imageStore)
</script>

<style scoped>
.row_preview{
	width: 100%;
	height: 60px;
	color: purple;
	display: flex;
	align-items: center;
	justify-content: center;
}
img{
	width: 80%;
}
.aside {
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	background-color: rgba(255, 255, 255, 0.792);
	border: 2px; /* 半透明背景 */
	box-shadow: 0 10px 15px rgba(129, 124, 124, 0.2);
	border-radius: 5px;
	backdrop-filter: blur(10px); /* 背景模糊 */
	width: calc(100% - 8px);
	height: 95%;
	overflow: hidden;
}
</style>
