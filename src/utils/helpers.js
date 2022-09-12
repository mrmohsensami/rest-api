export const handleError = res => {
    if (! res.ok) {
        throw new Error('ارور داشتیم')
    }
    return res;
}