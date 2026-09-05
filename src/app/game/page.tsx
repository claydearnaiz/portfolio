import { redirect } from "next/navigation";

// The portfolio no longer exposes the former themed game experience.
export default function GamePage() {
  redirect("/#projects");
}
