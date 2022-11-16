export async function getLocation() {
  if (process.env.NODE_ENV === "development") {
    throw new Error("Not valid in development");
  }

  const res = await fetch("/api/location");

  if (res.ok) {
    return await res.json();
  }

  throw new Error("Could not fetch location from edge server");
}
