import Cookies from "js-cookie";

function getAvatar() {
  return Cookies.get("avatar");
}

export default getAvatar;
