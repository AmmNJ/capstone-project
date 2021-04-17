export default function loadFromLocal(key) {
  const jsonString = localStorage.getItem(key)
  try {
    return jsonString ? JSON.parse(jsonString) : ''
  } catch (error) {
    console.error(error)
  }
}
