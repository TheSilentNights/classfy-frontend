<template>
	<div class="header">
		<div v-if="getLinkedStatus">Current Linked To:{{ getUrl }}</div>
		<div v-else>Links To {{ getUrl }} failed</div>
		<div class="button">
			<el-button type="primary" style="width: 80px" @click="onClick">Refresh</el-button>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { backendUrlStorge } from '../store/backendUrlStorge'
import { storeToRefs } from 'pinia'
const urlStorge = backendUrlStorge() //后端储存
const { getUrl, getLinkedStatus } = storeToRefs(urlStorge)
const testConnection = urlStorge.testConnection // 测试连接函数

function onClick() {
	testConnection()
}
</script>

<style scoped>
.header {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(255, 255, 255, 0.726);
	box-shadow: 0 10px 15px rgba(129, 124, 124, 0.2);
	border: 2px;
	border-radius: 5px;
	backdrop-filter: blur(10px); /* 背景模糊 */
	width: calc(100% - 16px);
	height: 100%;
}
.button {
	margin-left: 20px;
}
</style>
