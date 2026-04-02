export type Member = {
  id: number;
  name: string;
  role: string;
  photo: string;
};

export const members: Member[] = [
  {
    id: 1,
    name: "Lisa Joosten",
    role: "Zang / Gitaar",
    photo: "/images/members/lisa.jpg",
  },
  {
    id: 2,
    name: "Sten Ruijten",
    role: "Bas / Zang",
    photo: "/images/members/sten.jpg",
  },
  {
    id: 3,
    name: "Maarten Hormes",
    role: "Gitaar / Zang",
    photo: "/images/members/maarten.jpg",
  },
  {
    id: 4,
    name: "Max Wolters",
    role: "Drums",
    photo: "/images/members/max.jpg",
  },
];
