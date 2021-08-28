const userPreferencesStorageName = "APP:USER-PREFERENCES";

interface IUserPreferences {
  theme: "dark" | "light";
  lang: "en" | "pt";
  defaultBreathingRepeat: number;
}

// Detect and set default user preferences
if (!localStorage.getItem(userPreferencesStorageName)) {
  let detectedTheme, detectedLang;

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    detectedTheme = "dark";
  } else {
    detectedTheme = "light";
  }

  if (
    Array.from(window.navigator.language)
      .splice(0, 2)
      .toString()
      .replace(/,/g, "") === "pt"
  ) {
    detectedLang = "pt";
  } else {
    detectedLang = "en";
  }

  const detectedPreferences = {
    theme: detectedTheme || "light",
    lang: detectedLang || "en",
    defaultBreathingRepeat: 16,
  };

  localStorage.setItem(
    userPreferencesStorageName,
    JSON.stringify(detectedPreferences)
  );
}

const userPreferences = JSON.parse(
  localStorage.getItem(userPreferencesStorageName) ||
    '{ "theme": "light", "lang": "en", defaultBreathingRepeat: "16" }'
) as IUserPreferences;

class changeUserPreferences {
  public changeThemeTo(theme: IUserPreferences["theme"]) {
    document.body.classList.remove(userPreferences.theme);
    document.body.classList.add(theme);
    userPreferences.theme = theme;
    this.saveChanges();
  }

  public changeLangTo(lang: IUserPreferences["lang"]) {
    userPreferences.lang = lang;
    this.saveChanges();
  }

  public changeBreathingRepeatTo(newRepeatTime: number) {
    userPreferences.defaultBreathingRepeat = newRepeatTime;
    this.saveChanges();
  }

  private saveChanges() {
    localStorage.setItem(
      userPreferencesStorageName,
      JSON.stringify(userPreferences)
    );
  }
}

const ChangeUserPreferences = new changeUserPreferences();

export { userPreferences, ChangeUserPreferences, IUserPreferences };
