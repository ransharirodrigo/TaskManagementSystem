export function isRequired(value: string | undefined | null): boolean {
  return !!value?.trim();
}

export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function isValidPasswordLength(password: string, minLength = 6): boolean {
  return password.length >= minLength;
}
