export default function getHistory() {
  return fetch('/api/cards').then(res => res.json())
}
