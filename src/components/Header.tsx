import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full bg-zinc-900">
      <div className="flex justify-around text-white p-5">
        <div>
        <Link href="/">Home</Link>
        </div>
        <div>
          
          <Link href="/login">Login</Link>
        </div>
      </div>
    </div>
  )
}
