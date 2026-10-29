import { Routes } from "@src/config/routes";
import { useAuthContext } from "@src/context/auth.context";
import { useNavigation } from "@src/hooks"
import { useAuth } from "@src/queries/useAuth";
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react";

interface ILoginForm {
  login: string,
  password: string,
}

const initalLoginForm: ILoginForm = {
  login: '',
  password: ''
}

export const useLogin = () => {
  const translate = useTranslations('')
  const [form, setForm] = useState<ILoginForm>(initalLoginForm)
  const { navigationService } = useNavigation()
  const {isLoggedIn } = useAuthContext();
  const { mutateAsync } = useAuth()
  const onLogin = async () => {
    await mutateAsync(form)
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigationService.navigateTo(Routes.Dashboard);
    }
  }, [isLoggedIn]);

  return {
    translate,
    navigationService,
    onLogin,
    form,
    setForm
  }
}