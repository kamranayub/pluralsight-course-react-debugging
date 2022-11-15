export async function getLocation() {
  return fetch("/api/location");
}
