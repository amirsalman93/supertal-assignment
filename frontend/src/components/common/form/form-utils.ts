import { ToastService } from "../../../services/ToastService";

export namespace FormValidators {
    export const validateInputReqField = (
        fieldRef: React.RefObject<HTMLInputElement>,
        label: string,
        value: string
    ): boolean => {
        if (!value) {
            ToastService.ThrowMissingFormFieldError(label);
            fieldRef.current?.focus();
            return false;
        }
        return true;
    }

    export const validateInputMismatchField = (
        fieldRef: React.RefObject<HTMLInputElement>,
        label: string,
        value: string,
        otherValue: string
    ): boolean => {
        if (value !== otherValue) {
            ToastService.ThrowMissingFormFieldError(label);
            fieldRef.current?.focus();
            return false;
        }
        return true;
    }
}