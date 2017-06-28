import Cookies from 'js-cookie'

export function hasCookie() {
    return Cookies.get('userinfos') != undefined;
}
