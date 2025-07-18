import request from "@/utils/request";

// 查询用户列表
export const queryUserListApi = () => {
    return request.get('/users/manage/list');
}

// 新增用户
export const addUserInfoApi = (userInfo) => {
    return request.post('/users/manage/add', userInfo);
}

// 根据 id 查询单个用户信息
export const queryUserInfoByIdApi = (id) => {
    return request.get(`/users/manage/${id}`);  // 这里是反引号
}

// 编辑用户信息
export const updateUserInfoApi = (userInfo) => {
    return request.put('/users/manage/update', userInfo);
}

// 删除用户信息
export const deleteUserInfoApi = (ids) => {
    const idList = Array.isArray(ids) ? ids : [ids];
    return request.post('/users/manage/delete', idList, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}