export async function getLocation() {
  const res = await fetch("/api/location");

  if (res.ok) {
    return await res.json();
  }

  throw new Error("Could not fetch location from edge server");
}
