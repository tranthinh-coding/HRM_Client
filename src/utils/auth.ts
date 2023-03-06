import Cookies from 'js-cookie'

export const getToken = (key: string) => {
  return Cookies.get(key)
}

export const setToken = (key: string, token: any, time = 100 as number) => {
  return Cookies.set(key, token, { expires: time })
}

export const removeToken = (keys: string | string[]) => {
  if (typeof keys !== 'string') {
    return keys.forEach((key) => Cookies.remove(key))
  }
  return Cookies.remove(keys)
}
