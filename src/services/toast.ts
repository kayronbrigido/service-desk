import { translate } from "@src/i18n";
import toast from "react-hot-toast";


const Toasty = {
  success: async (message: string) => {
    return toast.success(await translate(`SUCCESS_MESSAGES.${message.toUpperCase()}`), {
      duration: 3000,
      position: 'top-right',
      style: {
        marginTop: '2em',
        marginRight: '5em'
      }
    });
  },
  error: async (message: string) => {
    return toast.error(await translate(`ERRORS.${message.toUpperCase()}`), {
      duration: 3000,
      position: 'top-right',
      style: {
        marginTop: '2em',
        marginRight: '5em'
      }
    });
  },
}

export default Toasty;