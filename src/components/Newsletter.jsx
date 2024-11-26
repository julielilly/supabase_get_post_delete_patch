import { postSub } from "@/lib/supabase";

import { revalidatePath } from "next/cache";

const Newsletter = async () => {
  async function send(formData) {
    "use server";

    const data = {
      navn: formData.get("name"),
      email: formData.get("email"),
    };

    await postSub(data);

    // svarer lidt til at lave et page-refresh (gør at dataen opdateres)
    revalidatePath("/");
  }

  return (
    <form action={send} className="max-w-md mx-auto my-2 p-4 bg-white shadow-md rounded">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name
        </label>
        <input type="text" id="name" name="name" required className="w-full px-3 py-2 border border-gray-300 rounded"></input>
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email
        </label>
        <input type="email" id="email" name="email" required className="w-full px-3 py-2 border border-gray-300 rounded"></input>
      </div>

      <button className="w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700 ">Subscribe</button>
    </form>
  );
};

export default Newsletter;
