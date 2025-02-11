import { FormInstance } from "antd";
import { Ref } from "react";

export enum EnumDriverRegistrationMode {
    phoneNumber = "PHONE_NUMBER",
    otp = "OTP",
    createNewUserAccount = "CREATE_NEW_USER_ACCOUNT",
    successPage = "SUCCESS_PAGE",
}

export interface IDriverRegistrationChildComponentProps {
    form: FormInstance,
}

export interface IDriverRegistrationCreateNewUserAccountComponentProps extends IDriverRegistrationChildComponentProps {
    onCancel: () => void
}

export interface IDriverRegistrationInputPhoneNumberComponentProps extends IDriverRegistrationChildComponentProps {
    onModalOk?: () => void
}