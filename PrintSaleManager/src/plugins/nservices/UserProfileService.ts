import { HTTPBaseService } from './HTTPBaseService'

export class UserProfileService extends HTTPBaseService {
  private static classInstance?: UserProfileService

  constructor(token: string) {
    super('https://localhost:5001/', token)
  }

  public static getInstance(token: string) {
    if (!this.classInstance)
      this.classInstance = new UserProfileService(token)

    return this.classInstance
  }

  // public userBusinessTerritoryData = () => this.instance.get('/BusinessData/InTerritory').then(response => {
  //   if (response)
  //     return response.data.entity[0]
  // })
  public callLogin = (userName: string, passWord: string) => this.instance.post('Login/v3/login', {
    userName,
    password: passWord,
    urlPage: 'https://localhost:5001',
  }).then(response => {
    if (response)
      return response.data
  }).catch(error => {
    throw error
  })
}
