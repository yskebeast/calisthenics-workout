namespace SampleModel {
  enum Language {
    python,
    typescript,
    ruby,
  }

  enum Pref {
    tokyo,
    osaka,
    kyoto,
  }

  model Sample {
    id: string;
    name: string;
    language: Language;
    preference: Pref;
  }
}
