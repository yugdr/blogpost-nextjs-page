export async function getUser(userId) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  return res.json();
}
