<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>

</script>

<style scoped>
.el-container{
    width: 100%;
    height: 100%;
}
.el_header{
    width: 100%;
    height: 100%;
}
.common-layout{
    height: 100%;
    width: 100%;
}
</style>