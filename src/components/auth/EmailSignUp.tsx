import { createClient } from "@/lib/supabase/server";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

async function signUpWithEmailAndPassword(email: string, password: string) {
  async function SignUp(email: string, password: string) {
    "use server";

    const origin = headers().get("origin");
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.signUp({
      email: "example@email.com",
      password: "example-password",
    });

    if (error) {
      console.log(error.message);
      return redirect(`/login?message=${error.message}`);
    } else {
      return redirect("/");
    }
  }

  return (
    <form action={() => {}}>
      <Label htmlFor="email">
        Email
        <Input name="email" type="email" placeholder="Type your email" />
      </Label>
      <Label htmlFor="password">
        Password
        <Input name="password" type="password" placeholder="Type a password" />
      </Label>
      <Button>Sign up</Button>
    </form>
  );
}
