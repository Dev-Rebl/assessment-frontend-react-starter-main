export const getAuthToken = async () => {
    let atc = document.cookie.split(";").find((cookie) => cookie.startsWith("authToken"));
    return atc?.split('=')[1] || null
}