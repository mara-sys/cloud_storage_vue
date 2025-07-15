import request from "@/utils/request";

// 查询私人文件列表
export const queryPrivateFileList = () => {
    return request.get('/files/browse/private');
}

export const queryPublicFileList = () => {
    return request.get('/files/browse/public');
}