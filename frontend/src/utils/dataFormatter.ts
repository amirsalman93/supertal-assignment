export namespace dataFormatter {
    export const arrayCount = (arr: any[]): number => {
        return arr && Array.isArray(arr) ? arr.length : 0;
    }
}