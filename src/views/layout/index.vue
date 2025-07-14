<script setup>

</script>

<template>
    <div class="common-layout">
        <el-container>
            <!-- Header 区域 -->
            <el-header class="header">
                <span class="title">存储系统测试</span>

                <span class="right_tool">
                    <a href="">
                        <el-icon><EditPen /></el-icon>修改密码
                    </a>
                    <a href="">
                        <el-icon><SwitchButton /></el-icon> 退出登录
                    </a>
                </span>
            </el-header>

            <el-container>
                <!-- 左侧菜单 -->
                <el-aside width="200px">
                    左侧菜单栏
                </el-aside>

                <!-- 右侧展示区域 -->
                <el-main>右侧核心展示区域</el-main>
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
</style>