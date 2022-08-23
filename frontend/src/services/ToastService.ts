import { ToastContainer, toast } from "react-toastify";

export namespace ToastService {
    export function Info(message: string) {
        toast.info(message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    }
    export function Error(message: string, error: string) {
        toast.error(message + "\n" + error, {
            position: toast.POSITION.TOP_RIGHT,
        });
    }
    export function ServerError(error: { statusCode: number; message: string }) {
        toast.error(error.statusCode + "\n" + error.message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    }
    export function Success(message: string) {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    }
    export function Warning(message: string) {
        toast.warn(message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    }

    export function ThrowMissingFormFieldError(fieldName: string) {
        ToastService.Error('Missing field(s):', `${fieldName} is required!`)
    }

    export function ThrowMismatchFormFieldError(fieldName: string) {
        ToastService.Error('Field Mismatch:', `${fieldName} fields must match!`)
    }
}
