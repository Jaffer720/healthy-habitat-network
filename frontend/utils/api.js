export async function fetchLocations() {
    const res = await fetch('http://localhost:8000/index.php/api/locations');
    const data = await res.json();
    return data.locations || [];
  }
  