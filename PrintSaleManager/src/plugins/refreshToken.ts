import axios from 'axios'
// eslint-disable-next-line @typescript-eslint/no-shadow
export const refreshToken = async (refreshToken: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post('/refresh-token', { refreshToken })

    return response.data
  }
  // eslint-disable-next-line sonarjs/no-useless-catch
  catch (error) {
    throw error
  }
}
