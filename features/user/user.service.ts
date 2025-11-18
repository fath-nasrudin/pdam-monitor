import { User } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export type DummyUser = {
  id: string;
  username: string;
  password: string;
};

export const getUserlist = (): DummyUser[] => {
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

export const getUsersForReadings = async (period: string): Promise<User[]> => {
  console.log({ period });
  console.log("TODO: period should be implemented");
  const users = await prisma.user.findMany();
  return users;
};
