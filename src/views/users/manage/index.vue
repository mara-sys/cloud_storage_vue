<script setup>
import { ref, onMounted } from 'vue';
import { queryUserListApi, addUserInfoApi, queryUserInfoByIdApi, updateUserInfoApi, deleteUserInfoApi } from '@/api/users/manage';
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Search,
  Plus,
  EditPen,
  Delete,
} from '@element-plus/icons-vue'


const userList = ref([])

const dialogAddUserFormVisable = ref(false);
const formLabelWidth = '140px';
const formTitle = ref('');

const userForm = ref({
  id: '',
  loginName: '',
  realName: '',
  email: '',
  role: ''
});

// 表单校验
const userFormRules = ref({
  loginName: [
    { required: true, message: '登录名不能为空', trigger: 'blur' },
    { max: 100, message: '超过长度限制', trigger: 'blur' },
  ],
  realName: [
    { required: true, message: '真实姓名不能为空', trigger: 'blur' },
    { max: 100, message: '超过长度限制', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
  ],
  role: [
    { required: true, message: '请选择用户权限', trigger: 'change', },
  ],
})

const userFormRef = ref();


onMounted( () => {
  searchUserList();
})

// 查询用户列表
const searchUserList = async () => {
  const result = await queryUserListApi();
  if (result.code) {
    userList.value = result.data;
  }
}

// 新增用户按钮
const addUserDialog = () => {
  userForm.value = {
    id: '',
    loginName: '',
    realName: '',
    email: '',
    role: ''
  };
  formTitle.value = "新增用户信息";
  dialogAddUserFormVisable.value = true;
  // 重置表单校验信息
  if (userFormRef.value) {
    userFormRef.value.resetFields();
  }
}

// 保存新增用户信息
const addUserConfirm = async () => {
  // 表单校验
  if (!userFormRef.value) return;
  userFormRef.value.validate(async (valid) => { // valid 表示是否校验通过
    if (valid) {
      let result;
      if (userForm.value.id) {
        result = await updateUserInfoApi(userForm.value);
      } else {
        result = await addUserInfoApi(userForm.value);
      }

      if (result.code) {
        // 提示信息
        ElMessage.success('信息修改完成');

        // 关闭对话框
        dialogAddUserFormVisable.value = false;

        // 查询
        searchUserList();
      } else {
        ElMessage.error('添加用户失败');
      }
    } else {
      ElMessage.error('表单校验不通过');
    }
  })

  return null;
}

// 编辑用户信息按钮
const editUserInfo = async (id) => {
  formTitle.value = '编辑用户信息';
  // 重置表单校验信息
    if (userFormRef.value) {
      userFormRef.value.resetFields();
    }

  const result = await queryUserInfoByIdApi(id);
  if (result.code) {
    dialogAddUserFormVisable.value = true;
    Object.assign(userForm.value, result.data);
  } else {
    ElMessage.error('查询用户信息失败');
  }
}

// 删除用户信息按钮
const deleteUserInfo = async (id) => {
  ElMessageBox.confirm(
    '确认删除该用户信息吗?',
    'Warning',
    { confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning', }
  ).then(async () => {
    console.log('开始删除用户，id', id);
    const result = await deleteUserInfoApi(id);
    if (result.code) {
      ElMessage({ type: 'success', message: '成功删除', })
      searchUserList();
    } else {
      ElMessage({ type: 'error', message: '删除失败', })
    }
  }).catch(() => {
      ElMessage({ type: 'info', message: '取消删除', }) })
}


</script>

<template>
  <h1>这是用户列表</h1>
  <div>
    <el-button type="primary" :icon="Search" circle />
    <el-button type="primary" :icon="Plus" @click="addUserDialog" round>新增用户</el-button>
  </div>
  <div>
    <el-table :data="userList" stripe style="width: 80%">
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="loginName" label="登录名" width="180" />
      <el-table-column prop="realName" label="真实姓名" width="180" />
      <el-table-column prop="email" label="邮箱" width="180" />
      <el-table-column prop="uploadTime" label="添加时间" width="180" />
      <el-table-column prop="role" label="权限" width="180" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button :icon="EditPen" circle @click="editUserInfo(scope.row.id)" />
          <el-button :icon="Delete" circle @click="deleteUserInfo(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- Dialog 对话框 -->
  <el-dialog v-model="dialogAddUserFormVisable" :title="formTitle" width="500">
    <el-form :model="userForm" :rules="userFormRules" ref="userFormRef">
      <el-form-item label="登录名" :label-width="formLabelWidth" prop="loginName">
        <el-input v-model="userForm.loginName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="realName">
        <el-input v-model="userForm.realName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="userForm.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="权限" :label-width="formLabelWidth" prop="role">
        <el-select v-model="userForm.role" placeholder="请选择用户权限">
          <el-option label="普通用户" value="user" />
          <el-option label="管理员" value="admin" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogAddUserFormVisable = false">取消</el-button>
        <el-button type="primary" @click="addUserConfirm">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>

<style scoped>

</style>