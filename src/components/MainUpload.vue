<template>
	<div class="upload-container">
		<el-upload class="image-uploader" action="#" :auto-upload="false" :show-file-list="false" :on-change="handleChange" :before-upload="beforeUpload">
			<img v-if="imageUrl" :src="imageUrl" class="uploaded-image" />
			<el-icon v-else class="uploader-icon"><Plus /></el-icon>
		</el-upload>

		<div class="preview-container" v-if="imageUrl">
			<h3>预览</h3>
			<el-image :src="imageUrl" fit="contain" class="preview-image" />
		</div>

		<div class="action-buttons">
			<el-button type="primary" :loading="loading" :disabled="!imageUrl" @click="submitUpload">
				{{ loading ? '上传中...' : '上传到服务器' }}
			</el-button>
			<el-button @click="resetUpload" :disabled="loading">重置</el-button>
		</div>

		<div v-if="uploadResult" class="result-message">
			<el-alert :title="uploadResult.message" :type="uploadResult.success ? 'success' : 'error'" show-icon />
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import axios from 'axios' // 确保已安装axios: npm install axios
import { useImageUrlStore } from '../store/imageStore'

const imageUrl = ref('')
const loading = ref(false)
const uploadResult = ref(null)
const selectedFile = ref(null)
const imgageStroge = useImageUrlStore()


// 处理文件选择
const handleChange = (file) => {
	if (!file.raw) return

	// 验证图片类型
	const isImage = file.raw.type.startsWith('image/')
	if (!isImage) {
		ElMessage.error('只能上传图片文件!')
		return
	}

	// 生成预览URL
	imageUrl.value = URL.createObjectURL(file.raw)
	imgageStroge.setUrl = URL.createObjectURL(file.raw)
	selectedFile.value = file.raw
}

// 上传前验证
const beforeUpload = (file) => {
	const isLt5M = file.size / 1024 / 1024 < 5
	if (!isLt5M) {
		ElMessage.error('图片大小不能超过5MB!')
		return false
	}
	return true
}

// 提交到服务器
const submitUpload = async () => {
	if (!selectedFile.value) return

	loading.value = true
	uploadResult.value = null

	try {
		const formData = new FormData()
		formData.append('image', selectedFile.value)

		// 替换为你的实际API地址
		const response = await axios.post('https://your-api-endpoint/upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})

		uploadResult.value = {
			success: true,
			message: `上传成功! 服务器路径: ${response.data.path}`,
		}

		ElMessage.success('图片上传成功')
	} catch (error) {
		console.error('上传失败:', error)
		uploadResult.value = {
			success: false,
			message: `上传失败: ${error.response?.data?.message || error.message}`,
		}
		ElMessage.error('图片上传失败')
	} finally {
		loading.value = false
	}
}

// 重置上传状态
const resetUpload = () => {
	imageUrl.value = ''
	selectedFile.value = null
	uploadResult.value = null
}
</script>

<style scoped>
.upload-container {
	max-width: 600px;
	margin: 20px auto;
	padding: 20px;
	border: 1px solid #ebeef5;
	border-radius: 8px;
	background: #fff;
}

.image-uploader {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 200px;
	height: 200px;
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	margin: 0 auto;
	transition: border-color 0.3s;
}

.image-uploader:hover {
	border-color: #409eff;
}

.uploader-icon {
	font-size: 28px;
	color: #8c939d;
}

.uploaded-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.preview-container {
	margin-top: 30px;
	text-align: center;
}

.preview-image {
	max-width: 100%;
	max-height: 300px;
	border-radius: 4px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.action-buttons {
	margin-top: 20px;
	text-align: center;
}

.result-message {
	margin-top: 20px;
}
</style>
