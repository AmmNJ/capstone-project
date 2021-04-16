export default function postHistory(id, history) {
  return fetch(`'/api/history-entries/${id}'`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(id, history),
  })
    .then(res => res.json())
    .then(data => (data.error ? Promise.reject(data) : data))
}
