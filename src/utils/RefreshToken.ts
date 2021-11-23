import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

export const RefreshToken = (
  res: GoogleLoginResponse | GoogleLoginResponseOffline
) => {
  var refreshTiming =
    ((res as GoogleLoginResponse).tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthResponse = await (res as GoogleLoginResponse).reloadAuthResponse();
    refreshTiming = (newAuthResponse.expires_in || 3600 - 5 * 60) * 1000;
    setTimeout(refreshToken, refreshTiming);
  };
  setTimeout(refreshToken, refreshTiming);
};
