// data bliver inhentet fra .env.local
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const apikey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const headerList = {
  Accept: "application/json",
  "Content-Type": "application/json",
  apikey: apikey,
  Prefer: "return=representation",
};

export async function getSubs() {
  const response = await fetch(url, {
    method: "GET",
    headers: headerList,
  });

  const data = await response.json();
  return data;
}
