export default function getUser(name) {
  return fetch(`'/api/users/${name}'`).then(res => res.json())
}
