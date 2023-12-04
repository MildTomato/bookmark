"use client";

import { actionSignIn } from "@/app/signin/actions";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Loader2Icon } from "lucide-react";

async function SignInForm() {
  const initialState = {
    message: undefined,
    success: undefined,
    error: undefined,
    data: {
      email: "",
      password: "",
    },
  };

  const [state, formAction] = useFormState(actionSignIn, initialState);

  const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} className="mt-2" type="submit">
        {pending && <Loader2Icon className="animate-spin" />}
        Sign in
      </Button>
    );
  };

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <Label htmlFor="email">
          Email
          <Input
            className="mt-2"
            name="email"
            type="email"
            placeholder="Type your email"
            required
            defaultValue={state.data.email}
          />
        </Label>
        <Label htmlFor="password">
          Password
          <Input
            className="mt-2"
            name="password"
            type="password"
            placeholder="Type a password"
            required
            defaultValue={state.data.password}
          />
        </Label>
      </div>
      <div className="flex flex-col gap-6">
        <SubmitButton />
        {state.error && <p className="text-destructive">{state.error}</p>}
        <p className="sr-only">{state.message}</p>
      </div>
    </form>
  );
}

export { SignInForm };
