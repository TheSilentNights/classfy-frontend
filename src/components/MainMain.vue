<template>
	<div class="body">Body</div>
</template>

<script setup></script>

<style scoped>
.body {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(255, 255, 255, 0.2);
	border: 2px; /* 半透明背景 */
	box-shadow: 0 10px 15px rgba(129, 124, 124, 0.3);
	border-radius: 5px;
	backdrop-filter: blur(10px); /* 背景模糊 */
	width: calc(100% - 18px);
	height: 95%;
	overflow: hidden;
}
</style>
