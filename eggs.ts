export type Egg = {
  id: string;
  mark: string;
  title: string;
  body: string;
  huge?: boolean;
};

export const EGGS: Egg[] = [
  { id: "kydni", mark: "🦃", title: "karteczka", body: "KYDNI", huge: true },
  { id: "losowa-ona", mark: "🧑‍🌾", title: "karteczka", body: "pamiętasz swoją losową emotke?" },
  { id: "losowa-on-1", mark: "🚛", title: "karteczka", body: "pamiętasz moją losową emotke 1/2" },
  { id: "losowa-on-2", mark: "🤸", title: "karteczka", body: "kolejna moja losowa 2/2" },
  { id: "bubble", mark: "🧋", title: "karteczka", body: "kojarzysz nasz motyw na messengerze?" },
  { id: "hug", mark: "🫂", title: "karteczka", body: "codziennie sobie je wysyłamy haha" },
  { id: "shark", mark: "🦈", title: "karteczka", body: "moje ulubione zwierze" },
  { id: "his-heart", mark: "💝", title: "karteczka", body: "moje serduszko" },
  { id: "her-heart", mark: "💗", title: "karteczka", body: "twoje serduszko" },
  { id: "franek", mark: "Franek", title: "karteczka", body: "imię naszego dinozaura 1/2" },
  { id: "gilbert", mark: "Gilbert", title: "karteczka", body: "imię naszego dinozaura 2/2" },
  { id: "sniezka", mark: "śnieżka", title: "karteczka", body: "kocham cię śnieżko 🤍" },
];

export const ALL_NOTES_MESSAGE =
  "gratulacje! zebrałaś wszystkie karteczki , wygrałaś nieskończoność buziaczków ode mnie! ❤️";

export const HANDSHAKE_SEQUENCE = [2, 3, 3, 1, 1, 1, 5, 4, 3, 2, 2, 1, 1] as const;

export const HANDSHAKE_WIN = "BRAWO! MASZ ŚWIETNĄ PAMIĘĆ! ❤️";
