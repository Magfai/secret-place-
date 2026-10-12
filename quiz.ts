export type QuizQuestion = {
  id: string;
  prompt: string;
  options: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
};

export const QUIZ: QuizQuestion[] = [
  {
    id: "birthday",
    prompt: "kiedy mam urodziny?",
    options: ["23 kwietnia", "25 kwietnia", "23 września", "25 września"],
    answer: 3,
  },
  {
    id: "first-text",
    prompt: "kiedy zaczęliśmy pierwszy raz pisać?",
    options: ["10 stycznia", "11 stycznia", "9 stycznia", "10 lutego"],
    answer: 0,
  },
  {
    id: "color",
    prompt: "jaki jest mój ulubiony kolor?",
    options: ["biały", "czarny", "niebieski", "fioletowy"],
    answer: 1,
  },
  {
    id: "kid",
    prompt: "kim chciałem być jako dziecko?",
    options: ["policjantem", "strażakiem", "ratownikiem medycznym", "żadne z powyższych"],
    answer: 1,
  },
  {
    id: "cartoon",
    prompt: "jaka jest lub była moja ulubiona bajka?",
    options: ["SpongeBob", "Scooby-Doo", "Niesamowity świat Gumballa", "Harmidom"],
    answer: 2,
  },
  {
    id: "hero",
    prompt: "jakbym miał być superbohaterem to jakim?",
    options: ["Hulk", "Iron-Man", "Spider-Man", "Deadpool"],
    answer: 2,
  },
  {
    id: "car",
    prompt: "moje wymarzone auto?",
    options: ["Mercedes G-klasa", "Bentley", "Dodge Challenger", "Dodge Charger"],
    answer: 2,
  },
  {
    id: "challenger",
    prompt: "pewnie od razu zaznaczyłaś że dodge challenger , to teraz pytanie jaki?",
    options: [
      "Dodge Challenger GT",
      "Dodge Challenger R/T Scat Pack",
      "SRT Hellcat Redeye",
      "Demon 170",
    ],
    answer: 2,
  },
  {
    id: "shoe",
    prompt: "jaki mam rozmiar buta?",
    options: ["44", "43", "45", "42"],
    answer: 0,
  },
  {
    id: "food",
    prompt: "jaki jest mój ulubiony fast-food?",
    options: ["McDonald", "KFC", "Pizza", "Kebab"],
    answer: 3,
  },
];

export const LETTER = `Hej kotek , wpadłaś tu usłyszeć kilka miłych słów prosto z mojego serduszka? , haha pewnie że coś dla ciebie mam , totalnie nie mam pojęcia jaki humor ci teraz towarzyszy ale
jeśli jesteś szczęśliwa - to tak trzymaj! uśmiechaj się ile wlezie bo twój uśmiech to najlepsze co zobaczyłem w życiu , natomiast jeśli masz gorszy humor lub jest ci smutno - to pamiętaj że w każdej chwili jestem przy tobie , jeśli nie ciałem to mentalnie , pamiętaj że zawsze możesz do mnie zadzwonić , nie ważne gdzie jestem i co robię , dzwoń śmiało nawet w środku nocy , kocham cię z całego serca skarbie mój najdroższy ❤️`;

export const CAPSULE_LOCKED = "jeszcze nie teraz , możesz otworzyć 7 kwietnia";
export const CAPSULE_OPEN =
  "WSZYSTKIEGO NAJLEPSZEGO Z OKAZJI NASZEJ 2 ROCZNICY!!!!!! ❤️❤️❤️❤️";
export const QUIZ_REWARD = "brawo kotku";
export const KRYSTIAN_SMS = "+48722068037";
