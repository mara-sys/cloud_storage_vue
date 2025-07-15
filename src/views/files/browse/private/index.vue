<script setup>
import { ref, onMounted } from 'vue';
import { queryPrivateFileList } from '@/api/files/browse';
import {
  Delete,
  Edit,
  Search,
  FolderAdd,
  Upload,
  EditPen,
  DocumentDelete,
  Scissor,
  DocumentCopy,
} from '@element-plus/icons-vue'

// 钩子函数
onMounted( () => {
  search();
})

// 查询
const search = async () => {
  const result = await queryPrivateFileList();
  if (result.code) {
    fileList.value = result.data;
  }
}

const fileList = ref([])
</script>

<template>
  <div>
    <el-button type="primary" :icon="Search" circle />
    <el-button type="primary" :icon="Upload" circle />
    <el-button type="primary" :icon="FolderAdd" circle />
  </div>
  <div>
    <el-table :data="fileList" stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="fileName" label="名称" width="180" />
      <el-table-column prop="createTime" label="上传时间" width="180" />
      <el-table-column prop="size" label="大小" width="180" />
      <el-table-column label="操作">
        <template #default>
          <el-button :icon="EditPen" circle />
          <el-button :icon="Scissor" circle />
          <el-button :icon="DocumentCopy" circle />
          <el-button :icon="DocumentDelete" circle />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>

</style>