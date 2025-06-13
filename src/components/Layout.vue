<template>
	<div class="common-layout">
		<el-container>
			<el-header><MainHeader /></el-header>
			<el-container>
				<el-aside width="300px"><MainAside /></el-aside>
				<el-main><MainMain /></el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup>
import MainHeader from './MainHeader.vue'
import MainAside from './MainAside.vue'
import MainMain from './MainMain.vue'
</script>

<style scoped>
.el-container {
	width: 100%;
	height: 100%;
}
.el-header {
	padding: 0;
	margin-bottom: 20px;
}
.el-aside {
	overflow: hidden;
	height: 100%;
}
.el-main {
	padding: 0;
	margin-left: 10px;
}
.common-layout {
	height: 100%;
	width: 100%;
}
</style>
