
export const APIsRequest = {
  signupRequest: async (deviceId: string, data: any) => {
    const formData = new FormData();
    formData.append('firstname', data.firstname);
    formData.append('lastname', data.lastname);
    formData.append('mail', data.mail);
    formData.append('password', data.password);
    data?.file && formData.append('file', data.file);

    const headers = { 'User-Device': deviceId, 'Content-Type': 'application/json' };
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/signup`, { body: formData, method: 'POST', headers });
  },

  signinRequest: async (deviceId: string, data: any) => {
    const headers = { 'User-Device': deviceId, 'Content-Type': 'application/json' };
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/signin`, { body: JSON.stringify(data), method: 'POST', headers });
  },

  verifyAccountRequest: async (session: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/verify-email/${session}`, { method: 'GET' });
  },

  resetPasswordRequest: async (session: any, data: any) => {
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/reset-password/${session}`, { body: JSON.stringify(data), method: 'PATCH' });
  },

  sendVerificationLinkRequest: async (deviceId: string, action: string, data: any) => {
    const headers = { 'User-Device': deviceId, 'Content-Type': 'application/json' };
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/send-verification-link/${action}`, { body: JSON.stringify(data), method: 'POST', headers });
  },

  signoutRequest: async (session: string, deviceId: string) => {
    const headers = { Authorization: `Bearer ${session}`, 'User-Device': deviceId, 'Content-Type': 'application/json' };
    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/signout`, { method: 'DELETE', headers });
  }
};
