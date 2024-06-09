import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-[85vh] flex container mx-auto items-center justify-center">
      <SignIn />
    </div>
  );
}