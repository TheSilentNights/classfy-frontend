<template>
	<div>
		<el-upload class="upload-demo" action="#" :auto-upload="false" :on-change="handleChange" :show-file-list="false">
			<template #trigger>
				<el-button type="primary">选择图片</el-button>
			</template>
			<el-button class="ml-3" type="success" @click="submitUpload">上传到服务器</el-button>
			<el-button class="ml-3" type="info" @click="startClassification">开始分类</el-button>
		</el-upload>

		<div v-if="imageUrl" class="mt-4">
			<h3>预览:</h3>
			<img :src="imageUrl" alt="Preview" class="preview-image" />
		</div>

		<div v-if="responseMessage" class="mt-4">
			<el-alert :title="responseMessage" :type="responseType" />
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const file = ref(null)
const imageUrl = ref('')
const responseMessage = ref('')
const responseType = ref('')
const filename = ref('')

const handleChange = (uploadFile) => {
	file.value = uploadFile.raw
	// 创建预览图
	const reader = new FileReader()
	reader.onload = (e) => {
		imageUrl.value = e.target.result
	}
	reader.readAsDataURL(file.value)

	responseMessage.value = ''
}

const submitUpload = async () => {
	if (!file.value) {
		responseMessage.value = '请先选择图片'
		responseType.value = 'error'
		return
	}

	const formData = new FormData()
	formData.append('image', file.value)

	try {
		const response = await axios.post('http://localhost:7777/upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})

		responseMessage.value = `上传成功: ${response.data.filename}`
		filename.value = response.data.filename
		responseType.value = 'success'
	} catch (error) {
		responseMessage.value = `上传失败: ${error.response?.data?.error || error.message}`
		responseType.value = 'error'
	}
}

async function startClassification() {
	const responce = await axios.get('http://localhost:7777/api/classify',{
		params: {
			filename: filename.value
		}
	})
}
</script>

<style>
.preview-image {
	max-width: 100%;
	max-height: 300px;
	border: 1px solid #eee;
	border-radius: 4px;
	padding: 5px;
}
.ml-3 {
	margin-left: 10px;
}
.mt-4 {
	margin-top: 20px;
}
</style>
