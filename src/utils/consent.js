const CONSENT_KEY = 'ssvt_consent';

export function getConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

export function setConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // ignore storage errors
  }
}

export function clearConsent() {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    // ignore storage errors
  }
}
