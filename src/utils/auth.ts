import Cookies from 'js-cookie'

export const getToken = (key: string) => {
  return Cookies.get(key)
}

export const setToken = (key: string, token: any, options?: any) => {
  return Cookies.set(key, token, options)
}

export const removeToken = (keys: string | string[]) => {
  if (typeof keys !== 'string') {
    return keys.forEach((key) => Cookies.remove(key))
  }
  return Cookies.remove(keys)
}
