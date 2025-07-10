
import { twMerge } from "tailwind-merge"
import { type ClassValue, clsx } from "clsx"
import { UserSession } from "@/types/auth.interface";

export const encrypt = (data: string) => {
  try {
    return btoa(data);
  } catch (error: unknown) {
    window.location.replace("/");
    return String(error);
  }
};

export const decrypt = (data: string) => {
  try {
    return atob(data);
  } catch (error: unknown) {
    window.location.replace("/");
    return String(error);
  }
};

export const generateDeviceId = (digits = 12) => {
  const deviceId = Math.random().toString(36).substr(2, 16);
  localStorage.setItem("user_device", encrypt(deviceId));
  return deviceId.slice(0, digits);
};

export const getAuthSessions = (): {
  session: UserSession,
  device: string
} | null => {
  const authSessionData = localStorage.getItem("auth_session_data");
  const userDevice = localStorage.getItem("user_device");

  if (!authSessionData || !userDevice) return null;

  const decryptedSession = decrypt(authSessionData);
  const decryptedDevice = decrypt(userDevice);

  const parsedSession = JSON.parse(decryptedSession) as UserSession;

  if (!parsedSession?.access_token) {
    return null;
  }

  return {
    session: parsedSession,
    device: decryptedDevice
  };
};

export const clearAuthData = (): void => {
  localStorage.removeItem("auth_session_data");
  localStorage.removeItem("user_device");
};

export const authVerify = async (): Promise<{
  session: UserSession | null;
  user: any | null;
  status: 'authenticated' | 'unauthenticated'
}> => {
  try {
    const authSessions = getAuthSessions();

    if (!authSessions) {
      clearAuthData();
      return { status: 'unauthenticated', user: null, session: null };
    }

    const headers: HeadersInit = {
      Authorization: `Bearer ${authSessions.session.access_token}`,
      'User-Device': authSessions.device
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/verify-auth-data/${authSessions.session.access_token}`, { method: 'GET', headers });
    if (!response.ok || response.status !== 200) {
      clearAuthData();
      return { status: 'unauthenticated', user: null, session: null };
    }

    const data = await response.json();
    return { status: 'authenticated', user: data?.data?.user, session: data?.data.session };

  } catch (error) {
    console.error('Auth verification error:', error);
    clearAuthData();
    return { status: 'unauthenticated', session: null, user: null };
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export function signupValidation(formData: { file: File | null; firstname: string; lastname: string; email: string; password: string; confirmPassword: string; }): { error: boolean; field?: string; message?: string } {
  const { file, firstname, lastname, email, password, confirmPassword } = formData;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;

  if (!file) {
    return { error: true, field: 'file', message: 'Profile picture is required' };
  }

  if (!firstname.trim()) {
    return { error: true, field: 'firstname', message: 'First name is required' };
  }

  if (!lastname.trim()) {
    return { error: true, field: 'lastname', message: 'Last name is required' };
  }

  if (!email.trim()) {
    return { error: true, field: 'email', message: 'Email is required' };
  }

  if (!emailRegex.test(email.trim())) {
    return { error: true, field: 'email', message: 'Invalid email format' };
  }

  if (!password.trim()) {
    return { error: true, field: 'password', message: 'Password is required' };
  }

  if (!passwordRegex.test(password.trim())) {
    return { error: true, field: 'password', message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character (e.g., Qwerty@123).', };
  }

  if (!confirmPassword.trim()) {
    return { error: true, field: 'confirmPassword', message: 'Confirm password is required' };
  }

  if (password !== confirmPassword) {
    return { error: true, field: 'confirmPassword', message: 'Passwords do not match' };
  }

  return { error: false };
};

export function signinValidation(formData: { email: string; password: string }): { error: boolean; field?: string; message?: string } {
  const { email, password } = formData;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;

  if (!email.trim()) {
    return { error: true, field: 'email', message: 'Email is required' };
  }

  if (!emailRegex.test(email.trim())) {
    return { error: true, field: 'email', message: 'Invalid email format' };
  }

  if (!password.trim()) {
    return { error: true, field: 'password', message: 'Password is required' };
  }

  if (!passwordRegex.test(password.trim())) {
    return { error: true, field: 'password', message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character (e.g., Qwerty@123).', };
  }

  return { error: false };
};

export function resetPasswordValidation(formData: { password: string; confirmPassword: string; }): { error: boolean; field?: string; message?: string } {
  const { password, confirmPassword } = formData;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;

  if (!password.trim()) {
    return { error: true, field: 'password', message: 'Password is required' };
  }

  if (!passwordRegex.test(password.trim())) {
    return { error: true, field: 'password', message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character (e.g., Qwerty@123).', };
  }

  if (!confirmPassword.trim()) {
    return { error: true, field: 'confirmPassword', message: 'Confirm password is required', };
  }

  if (password !== confirmPassword) {
    return { error: true, field: 'confirmPassword', message: 'Passwords do not match', };
  }

  return { error: false };
}

export function EmailValidation(formData: { email: string; }): { error: boolean; field?: string; message?: string } {
  const { email } = formData;

  const trimmedEmail = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!trimmedEmail) {
    return { error: true, field: 'email', message: 'Email is required', };
  }

  if (trimmedEmail.length < 4) {
    return { error: true, field: 'email', message: 'Email should have at least 4 characters', };
  }

  if (!emailRegex.test(trimmedEmail)) {
    return { error: true, field: 'email', message: 'Invalid email format', };
  }

  return { error: false };
}

