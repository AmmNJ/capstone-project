export default function getHistory(id) {
  return fetch(`/api/history-entries/${id}`).then(res =>
    res.ok ? res.json() : new Error(res.text())
  )
}
