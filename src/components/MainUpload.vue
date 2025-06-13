<template>
	<div class="image-upload-container">
		<el-upload class="upload-demo" action="#" :auto-upload="false" :show-file-list="false" :on-change="handleFileChange" :before-upload="beforeUpload">
			<template #trigger>
				<el-button type="primary">选择图片</el-button>
			</template>
		</el-upload>

		<el-dialog v-model="dialogVisible" title="图片裁剪" width="50%" @closed="destroyCropper">
			<div class="cropper-container">
				<img ref="imageRef" :src="imageUrl" alt="待裁剪图片" class="cropper-image" />
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button type="primary" @click="cropImage">确认裁剪</el-button>
				</span>
			</template>
		</el-dialog>

		<div v-if="croppedImage" class="preview-container">
			<h3>裁剪结果预览</h3>
			<img :src="croppedImage" alt="裁剪结果" class="preview-image" />
			<el-button type="success" @click="uploadImage" :loading="uploading">上传到服务器</el-button>
		</div>
	</div>
</template>

<script setup>
import { ref, nextTick, onBeforeUnmount } from 'vue'
import Cropper from 'cropperjs'

import axios from 'axios'
import { ElMessage } from 'element-plus'
import { CropperCanvas } from 'cropperjs'

const dialogVisible = ref(false)
const imageUrl = ref('')
const imageRef = ref(null)
const cropperInstance = ref(null) // 重命名为 cropperInstance
const croppedImage = ref('')
const uploading = ref(false)

// 文件类型和大小验证
const beforeUpload = (file) => {
	const isImage = file.type.startsWith('image/')
	const isLt5M = file.size / 1024 / 1024 < 5

	if (!isImage) {
		ElMessage.error('只能上传图片文件!')
		return false
	}
	if (!isLt5M) {
		ElMessage.error('图片大小不能超过5MB!')
		return false
	}

	return true
}

const handleFileChange = (file) => {
	if (!beforeUpload(file.raw)) return

	const reader = new FileReader()
	reader.onload = (e) => {
		imageUrl.value = e.target.result
		dialogVisible.value = true

		nextTick(() => {
			initCropper()
		})
	}
	reader.readAsDataURL(file.raw)
}

// 初始化Cropper
const initCropper = () => {
	// 确保DOM元素存在
	if (!imageRef.value) return

	// 销毁旧的Cropper实例
	destroyCropper()

	// 创建新的Cropper实例
	cropperInstance.value = new Cropper(imageRef.value, {
		aspectRatio: 1, // 裁剪比例（1:1正方形）
		viewMode: 1,
		autoCropArea: 0.8,
		movable: true,
		zoomable: true,
		rotatable: true,
		minContainerWidth: 300,
		minContainerHeight: 300,
		background: false,
		checkCrossOrigin: false,

		// 错误处理
		error: (err) => {
			console.error('Cropper error:', err)
			ElMessage.error('图片裁剪器初始化失败')
			dialogVisible.value = false
		},
	})
}

// 销毁Cropper实例
const destroyCropper = () => {
	if (cropperInstance.value) {
		cropperInstance.value.destroy()
		cropperInstance.value = null
	}
}

const cropImage = () => {
	// 确保Cropper实例存在且有getCroppedCanvas方法
	if (!cropperInstance.value || typeof cropperInstance.value.getCropperCanvas !== 'function') {
		ElMessage.error('裁剪器未正确初始化')
		return
	}

	try {
		const canvas = cropperInstance.value.getCropperCanvas({
			width: 500,
			height: 500,
			imageSmoothingEnabled: true,
			imageSmoothingQuality: 'high',
		})

		// 转换为DataURL
		console.log(canvas.children)
		croppedImage.value = canvas.children[0].src
		dialogVisible.value = false
	} catch (error) {
		console.error('裁剪失败:', error)
		ElMessage.error('图片裁剪失败: ' + error.message)
	}
}

const uploadImage = async () => {
	if (!croppedImage.value) return

	uploading.value = true

	try {
		const blob = dataURLtoBlob(croppedImage.value)
		const formData = new FormData()
		formData.append('image', blob, 'cropped-image.jpg')

		// 发送到后端（替换为你的API地址）
		const response = await axios.post('https://your-api.com/upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})

		ElMessage.success('上传成功！')
		console.log('服务器响应:', response.data)
	} catch (error) {
		console.error('上传失败:', error)
		ElMessage.error('上传失败: ' + error.message)
	} finally {
		uploading.value = false
	}
}

// 辅助函数：将DataURL转换为Blob
function dataURLtoBlob(dataurl) {
	const arr = dataurl.split(',')
	const mime = arr[0].match(/:(.*?);/)[1]
	const bstr = atob(arr[1])
	const n = bstr.length
	const u8arr = new Uint8Array(n)

	for (let i = 0; i < n; i++) {
		u8arr[i] = bstr.charCodeAt(i)
	}

	return new Blob([u8arr], { type: mime })
}

// 组件卸载前清理
onBeforeUnmount(() => {
	destroyCropper()
})
</script>

<style scoped>
.image-upload-container {
	max-width: 800px;
	margin: 20px auto;
	padding: 20px;
	border: 1px solid #ebeef5;
	border-radius: 8px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.cropper-container {
	width: 100%;
	height: 400px;
	overflow: hidden;
}

.cropper-image {
	display: block;
	max-width: 100%;
	max-height: 100%;
}

.preview-container {
	margin-top: 30px;
	text-align: center;
}

.preview-image {
	max-width: 300px;
	max-height: 300px;
	margin: 15px 0;
	border: 1px solid #dcdfe6;
	border-radius: 4px;
}
</style>
