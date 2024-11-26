import { getSubById, patchSub, deleteSub } from "@/lib/supabase";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import Link from "next/link";

const page = async ({ params }) => {
  const { id } = await params;

  const subscriberArray = await getSubById(id);
  const subscriber = subscriberArray[0];

  // id, dataToUpdate

  async function update(formData) {
    "use server";

    const data = {
      navn: formData.get("name"),
      email: formData.get("email"),
    };

    await patchSub(id, data);

    revalidatePath("/"); // svarer lidt til at lave et page-refresh (gør at dataen opdateres)
    redirect("/"); // redirecter tilbage til forsiden
  }

  async function deleteSubscriber() {
    "use server";

    await deleteSub(id);

    revalidatePath("/");
    redirect("/");
  }

  return (
    <div className="max-w-lg m-auto flex flex-col justify-center gap-4 h-[100svh] ">
      <Link href={"/"} className="border-b-2 border-b-gray-300 w-[15%] mb-4 hover:border-b-gray-500">
        Back
      </Link>
      <form action={update}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input type="text" id="name" name="name" defaultValue={subscriber.navn} className="w-full px-3 py-2 border border-gray-300 rounded"></input>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input type="email" id="email" name="email" defaultValue={subscriber.email} className="w-full px-3 py-2 border border-gray-300 rounded"></input>
        </div>

        <div className="flex gap-2">
          <button className="w-full bg-gray-300 py-2 rounded hover:bg-gray-400" formAction={deleteSubscriber}>
            Delete
          </button>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
