"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function actionSignIn(prevState: any, formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let redirectUrl = "";

  const schema = z.object({
    email: z.string(),
    password: z.string(),
  });

  const data = schema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  try {
    const { data: signInData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      throw error;
    }

    revalidatePath(`/`);
  } catch (error: any) {
    // console.log(error);
    console.log(error.message);
    return {
      success: false,
      message: error.message,
      error: error.message,
      data: {
        email: data.email,
        password: data.password,
      },
    };
  }

  redirect("/");
}

export async function actionSignOut(prevState: any, formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    revalidatePath(`/`);
  } catch (error: any) {
    // console.log(error);
    console.log(error.message);
    return {
      success: false,
      message: error.message,
      error: error.message,
    };
  }

  redirect("/signin");
}
