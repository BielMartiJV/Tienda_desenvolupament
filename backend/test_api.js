
async function test() {
  try {
    const res = await fetch('http://127.0.0.1:3000/');
    const text = await res.text();
    console.log('API Status:', res.status);
    console.log('API Response:', text);
  } catch (err) {
    console.error('Fetch failed:', err.message);
  }
}

test();
