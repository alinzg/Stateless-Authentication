import { logout } from "../lib/auth";
import { getUser } from "../lib/data";
import LogoutButton from "../ui/logout-button";

export default async function Page() {
  const name = await getUser();

  return (
    <>
      <LogoutButton onclick={logout} />
      <div className="text-2xl">Hello {name} !</div>
    </>
  );
}
