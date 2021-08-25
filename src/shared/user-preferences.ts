const userPreferencesStorageName = "APP:USER-PREFERENCES";

interface IUserPreferences {
  theme: "dark" | "light";
  lang: "en" | "pt";
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
  };

  localStorage.setItem(
    userPreferencesStorageName,
    JSON.stringify(detectedPreferences)
  );
}

const userPreferences = JSON.parse(
  localStorage.getItem(userPreferencesStorageName) ||
    '{ "theme": "light", "lang": "en" }'
) as IUserPreferences;

class changeUserPreferences {
  public changeThemeTo(theme: IUserPreferences["theme"]) {
    userPreferences.theme = theme;
    this.saveChanges();
  }

  public changeLangTo(lang: IUserPreferences["lang"]) {
    userPreferences.lang = lang;
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
