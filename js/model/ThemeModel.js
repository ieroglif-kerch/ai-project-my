const STORAGE_KEY = 'theme';
const DEFAULT_THEME = 'dark';

export class ThemeModel {
  getDefaultTheme() {
    return DEFAULT_THEME;
  }

  getSavedTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'dark' || saved === 'light' ? saved : null;
  }

  getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  setTheme(theme) {
    const isDark = theme === 'dark';

    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    return isDark ? 'dark' : 'light';
  }

  toggleTheme() {
    const next = this.getCurrentTheme() === 'dark' ? 'light' : 'dark';
    return this.setTheme(next);
  }
}
