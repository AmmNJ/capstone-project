export default function postHistory(history) {
  return fetch('/api/history', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(history),
  })
    .then(res => res.json())
    .then(data => (data.error ? Promise.reject(data) : data))
}
