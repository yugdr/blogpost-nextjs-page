import { User } from "@/interfaces/interfaces";

export async function getUser(userId: number): Promise<User | null> {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    if (!res.ok) {
      throw new Error("fetch user info failed!");
    }
    const data: User = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
