import { useToast } from 'vue-toastification'

export class NCoreConfig {
  public static localError = 'localError'

  public static showAlertError() {
    const toast = useToast()

    toast.error(localStorage.getItem(NCoreConfig.localError) ?? '', {
      timeout: 3000,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      draggable: true,
      draggablePercent: 0.6,
    })
  }
}
