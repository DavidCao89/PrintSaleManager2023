import axiosIns from '@axios'

export const loginService = async (userName: string, passWord: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosIns.post('Login/v3/login', {
      userName,
      password: passWord,
      urlPage: 'localhost:8080',
    })

    return response.data
  }
  // eslint-disable-next-line sonarjs/no-useless-catch
  catch (error) {
    return false
  }
}
