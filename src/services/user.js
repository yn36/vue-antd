import { LOGIN, ROUTES } from '@/services/api'
import { request, METHOD, removeAuthorization } from '@/utils/request'
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'

/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function login(name, password) {
  return request(LOGIN, METHOD.POST, {
    username: name,
    password: password
  })
}

export async function getRoutesConfig() {
  return request(ROUTES, METHOD.GET)
}

/**
 * 退出登录
 */
export function logout() {
  localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY)
  localStorage.removeItem(process.env.VUE_APP_PERMISSIONS_KEY)
  localStorage.removeItem(process.env.VUE_APP_ROLES_KEY)
  removeAuthorization()
  storage.remove(ACCESS_TOKEN)
}
export default {
  login,
  logout,
  getRoutesConfig
}
