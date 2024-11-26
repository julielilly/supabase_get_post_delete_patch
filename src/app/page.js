import Newsletter from "@/components/Newsletter";
import { getSubs } from "@/lib/supabase";

import Link from "next/link";

async function Home() {
  const subscribers = await getSubs();

  return (
    <div className="max-w-lg m-auto flex justify-center min-h-[95svh] flex-col gap-4 mt-[5svh]">
      <h1 className="text-2xl text-gray-700 font-bold mb-2">Newsletter</h1>

      <Newsletter />

      <div className="border-b-2 border-b-gray-100 w-full"></div>

      <ul className="bg-gray-100 grid grid-cols-2 p-4 gap-4 flex-wrap	">
        {subscribers.map((sub) => (
          <li key={sub.id} className="p-4 bg-white rounded-lg	flex justify-between items-center">
            <div>
              <div className="flex flex-col gap-2">{sub.navn}</div>
              <div className="text-gray-400 text-s">{sub.email}</div>
            </div>
            <Link href={`./update/${sub.id}`} className="text-xl text-gray-400 hover:text-gray-600">
              &gt;
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
