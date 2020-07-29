export const prepareError = (message, path, type, rest = null) => {
    return {
        error: {
            message: message,
            path: path,
            type: type,
            error: rest
        }
    }
}