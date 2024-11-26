// data bliver inhentet fra .env.local
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const apikey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const headerList = {
  Accept: "application/json",
  "Content-Type": "application/json",
  apikey: apikey,
  Prefer: "return=representation",
};

// GET
export async function getSubs() {
  const response = await fetch(url, {
    method: "GET",
    headers: headerList,
  });

  const data = await response.json();
  return data;
}

// GET by ID
export async function getSubById(id) {
  const response = await fetch(`${url}?id=eq.${id}`, {
    method: "GET",
    headers: headerList,
  });

  const data = await response.json();
  return data;
}

// POST
export async function postSub(subdata) {
  const response = await fetch(url, {
    method: "POST",
    headers: headerList,
    body: JSON.stringify(subdata),
  });

  console.log(subdata);

  const data = await response.json();

  console.log(data);
  return data;
}

// PATCH
export async function patchSub(id, dataToUpdate) {
  const response = await fetch(`${url}?id=eq.${id}`, {
    method: "PATCH",
    headers: headerList,
    body: JSON.stringify(dataToUpdate),
  });

  const data = await response.json();
  return data;
}

// DELETE
export async function deleteSub(id) {
  const response = await fetch(`${url}?id=eq.${id}`, {
    method: "DELETE",
    headers: headerList,
  });

  // eksempel på håndtering af svar
  if (response.ok) {
    console.log("Resource deleted successfully");
  } else {
    console.error("Failed to delete resource");
  }

  const data = await response.json();
  return data;
}
