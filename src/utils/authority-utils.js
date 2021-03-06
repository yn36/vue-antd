/**
 * 判断是否有路由的权限
 * @param route 路由
 * @param permissions 用户权限集合
 * @returns {boolean|*}
 */
function hasPermission(route, permissions) {
  const authority = route.meta.authority || '*'
  let required = '*'
  if (typeof authority === 'string') {
    required = authority
  } else if (typeof authority === 'object') {
    required = authority.permission
  }
  return required === '*' || (permissions && permissions.findIndex(item => item === required || item.id === required) !== -1)
}

/**
 * 判断是否有路由需要的角色
 * @param route 路由
 * @param roles 用户角色集合
 */
function hasRole(route, roles) {
  const authority = route.meta.authority || '*'
  let required = undefined
  if (typeof authority === 'object') {
    required = authority.role
  }
  return authority === '*' || hasAnyRole(required, roles)
}

/**
 * 判断是否有需要的任意一个角色
 * @param required {String | Array[String]} 需要的角色，可以是单个角色或者一个角色数组
 * @param roles 拥有的角色
 * @returns {boolean}
 */
function hasAnyRole(required, roles) {
  if (!required) {
    return false
  } else if(Array.isArray(required)) {
    return roles.findIndex(role => {
      return required.findIndex(item => item === role || item === role.id) !== -1
    }) !== -1
  } else {
    return roles.findIndex(role => role === required || role.id === required) !== -1
  }
}

export {hasPermission, hasRole}
