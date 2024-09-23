import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center gap-2">
      <p>Click here and try to enter:</p>
      <Link href={"/contents"} className="py-2 px-4 rounded bg-blue-600 text-white">
        enter
      </Link>
    </div>
  );
}
