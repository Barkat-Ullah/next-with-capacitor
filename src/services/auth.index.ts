/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Preferences } from "@capacitor/preferences";
import { jwtDecode } from "jwt-decode";

const setAccessToken = async (token: string) => {
  await Preferences.set({
    key: "accessToken",
    value: token,
  });
};

// const setRefreshToken = async (token: string) => {
//   await Preferences.set({
//     key: "refreshToken",
//     value: token,
//   });
// };

export const loginUser = async (loginData: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const result = await res.json();

    if (result.success) {
      await setAccessToken(result?.data?.accessToken);
      // await setRefreshToken(result?.data?.refreshToken);
    }
    return result;
  } catch (error: any) {
    console.error("Login Error:", error);
    return { success: false, message: error.message };
  }
};

export const getCurrentUser = async () => {
  const { value: accessToken } = await Preferences.get({ key: "accessToken" });

  let decodedData = null;

  if (accessToken) {
    try {
      decodedData = jwtDecode(accessToken);
      return decodedData;
    } catch (error) {
      return null;
    }
  } else {
    return null;
  }
};

export const logout = async () => {
  await Preferences.remove({ key: "accessToken" });
  // await Preferences.remove({ key: "refreshToken" });
};
