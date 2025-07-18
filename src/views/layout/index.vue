<script setup>
import router from '@/router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// 当前登录员工
const loginName = ref('');

// 钩子函数
onMounted(() => {
  const loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
  if (loginInfo && loginInfo.real_name) {
    loginName.value = loginInfo.real_name;
  }
})

// 退出登录
const logout = () => {
  // 弹出确认框
  ElMessageBox.confirm('确认退出？', '提示',
    { confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning' }
  ).then(async () => {  // 确认
    ElMessage.success('推出成功');
    localStorage.removeItem('loginInfo');
    router.push('/login');
  }).catch(() => {
    ElMessage.info('取消退出');
  })
}

</script>

<template>
  <div class="common-layout">
    <el-container>
      <!-- Header 区域 -->
      <el-header class="header">
        <span class="title">存储系统测试</span>

        <span class="right_tool">
          <a href="">
            <el-icon><EditPen /></el-icon>修改密码 &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
          </a>
          <a href="javascript:void(0)" @click="logout">
            <el-icon><SwitchButton /></el-icon> 退出登录【{{loginName}}】
          </a>
        </span>
      </el-header>

      <el-container>
        <!-- 左侧菜单 -->
        <el-aside width="200px" class="aside">
          <el-scrollbar>
            <el-menu :router="true">
              <el-menu-item index="/home"><el-icon><House /></el-icon>
                首页
              </el-menu-item>


              <el-sub-menu index="1">
                <template #title>
                  <el-icon><Files /></el-icon>文件列表
                </template>
                  <el-menu-item index="/files/browse/public"><el-icon><View /></el-icon>公共空间</el-menu-item>
                  <el-menu-item index="/files/browse/private"><el-icon><Hide /></el-icon>私人空间</el-menu-item>
              </el-sub-menu>

              <el-menu-item index="/contacts"><el-icon><User /></el-icon>
                联系人列表
              </el-menu-item>

              <el-sub-menu index="3">
                <template #title>
                  <el-icon><TrendCharts /></el-icon>存储空间统计
                </template>
                  <el-menu-item index="3-1">Option 1</el-menu-item>
                  <el-menu-item index="3-2">Option 2</el-menu-item>
              </el-sub-menu>

              <el-sub-menu index="4">
                <template #title>
                  <el-icon><Management /></el-icon>用户管理
                </template>
                  <el-menu-item index="/users/manage/list"><el-icon><UserFilled /></el-icon>用户列表</el-menu-item>
                  <el-menu-item index="/users/manage/add"><el-icon><CirclePlus /></el-icon>添加用户</el-menu-item>
                  <el-menu-item index="/users/manage/update"><el-icon><Lock /></el-icon>密码管理</el-menu-item>
              </el-sub-menu>

              <el-sub-menu index="5">
                <template #title>
                  <el-icon><Notebook /></el-icon>日志管理
                </template>
                  <el-menu-item index="5-1">Option 1</el-menu-item>
                  <el-menu-item index="5-2">Option 2</el-menu-item>
              </el-sub-menu>
            </el-menu>
          </el-scrollbar>
        </el-aside>

        <!-- 右侧展示区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.header {
  background-image: linear-gradient(to right, #003f8c, #005fa3, #007fd1, #339fff, #66bfff);
}

.title {
  color: white;
  font-size: 40px;
  font-family: 楷体;
  line-height: 60px;
  font-weight: bolder;
}

.right_tool{
  color: white;
  float: right;
  line-height: 60px;
}

a {
  color: white;
  text-decoration: none;
}

.aside {
  width: 220px;
  border-right: 1px solid #ccc;
  height: 730px;
}
</style>