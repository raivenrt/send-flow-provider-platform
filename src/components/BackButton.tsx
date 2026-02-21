import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function BackButton() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 mb-4 text-neutral-300 hover:text-white transition"
    >
      <ArrowLeft size={20} />
      Back
    </Link>
  );
}

export default BackButton;
