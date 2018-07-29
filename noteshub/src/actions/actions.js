export const UPLOAD_FILE = 'UPLOAD_FILE'

export function uploadFile(text) {
    return {type: UPLOAD_FILE, text: text}
}