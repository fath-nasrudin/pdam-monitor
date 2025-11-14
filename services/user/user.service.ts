export type User = {
  id: string;
  username: string;
  password: string;
};

export const getUserlist = (): User[] => {
  return [
    {
      id: "1",
      username: "dadang1",
      password: "dadang1",
    },
    {
      id: "2",
      username: "dadang2",
      password: "dadang2",
    },
    {
      id: "3",
      username: "dadang3",
      password: "dadang3",
    },
    {
      id: "4",
      username: "dadang4",
      password: "dadang4",
    },
    {
      id: "5",
      username: "dadang5",
      password: "dadang5",
    },
    {
      id: "6",
      username: "dadang4 123 dandan",
      password: "dadang4",
    },
  ];
};
