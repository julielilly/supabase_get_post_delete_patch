import { getSubs, postSub, patchSub, deleteSub } from "@/lib/supabase";

async function Home() {
  const subscribers = await getSubs();

  return (
    <div>
      <h1>Alle subscribers</h1>
      <ul>
        {subscribers.map((sub) => (
          <li key={sub.id}>
            {sub.navn} - {sub.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
