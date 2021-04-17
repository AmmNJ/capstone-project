export default function getHistory(id) {
  return fetch(`/api/history-entries/${id}`).then(res => res.json())
}
