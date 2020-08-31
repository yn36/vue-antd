/*
 * @Description: 系统管理接口
 * @Version: 1.0
 * @Autor: jiajun wu
 * @Date: 2020-08-29 19:26:50
 * @LastEditors: jiajun wu
 * @LastEditTime: 2020-08-29 19:35:46
 */
import { axios } from '@/utils/request_copy'
const prefix = '/system'

/** 头像上传 */
export function UploadAvatarWith(data) {
  return axios({
    url: `${prefix}/annex/avatar/upload`,
    method: 'post',
    data
  })
}