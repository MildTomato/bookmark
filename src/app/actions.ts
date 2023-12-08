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

export async function actionSignUp(prevState: any, formData: FormData) {
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
    const { data: signInData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      throw error;
    }

    revalidatePath(`/`);
  } catch (error: any) {
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

export async function actionInsertBookmark(prevState: any, formData: FormData) {
  console.log(formData.get("url"));
  console.log(formData.get("title"));
  console.log(formData.get("description"));

  const schema = z.object({
    url: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
  });

  const data = schema.parse({
    url: formData.get("url"),
    title: formData.get("title"),
    description: formData.get("description"),
  });

  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: user, error: userError } = await supabase.auth.getUser();

    if (!user.user?.id) {
      return {
        success: false,
        message: "Your user details were not found.",
      };
    }

    const { data: insertData, error: insertDataError } = await supabase
      .from("bookmarks")
      .insert({
        url: data.url ?? "https://",
        title: data.title,
        description: data.description,
        inserted_by: user.user.id,
      });

    if (insertDataError) {
      return {
        success: false,
        message: insertDataError.message,
      };
    }

    revalidatePath(`/`);

    return {
      success: true,
      message: "Bookmark inserted successfully.",
      data: {
        url: data.url,
        title: data.title,
        description: data.description,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function actionDeleteBookmark(prevState: any, formData: FormData) {
  const schema = z.object({
    id: z.string(),
  });

  const data = schema.parse({
    id: formData.get("id"),
  });

  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: user, error: userError } = await supabase.auth.getUser();

    if (!user.user?.id) {
      return {
        success: false,
        message: "Your user details were not found.",
      };
    }

    const { data: deleteData, error: deleteError } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", data.id);

    if (deleteError) {
      return {
        success: false,
        message: deleteError.message,
      };
    }

    revalidatePath(`/`);

    return {
      success: true,
      message: "Bookmark deleted successfully.",
      data: {
        id: data.id,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function favoriteAction(prevState: any, formData: FormData) {
  const schema = z.object({
    id: z.string(),
    favorite: z.boolean(),
  });

  try {
    const getFavorite = formData.get("favorite");
    const favoriteBoolean =
      getFavorite !== undefined && getFavorite === "true" ? true : false;

    const data = schema.parse({
      id: formData.get("id"),
      favorite: favoriteBoolean,
    });

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    console.log("data.favorite", data.favorite);
    console.log("data.id", data.id);

    const newFavorite = !data.favorite;

    // console.log("newFavorite", newFavorite);

    const { data: favoriteData, error } = await supabase
      .from("bookmarks")
      .update({ favorite: newFavorite })
      .eq("id", data.id);

    if (error) throw error;

    console.log("favoriteData", favoriteData);

    revalidatePath("/");

    return {
      success: true,
      message: "Favorite updated to " + newFavorite,
      data: {
        favorite: newFavorite,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
