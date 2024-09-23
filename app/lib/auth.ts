"use server";

import { FormState, SignupFormSchema } from "./definitions";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { createSession } from "./session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function signup(formState: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { email, password, name } = validatedFields.data;

  const exsitingEmail: Array<{ email: string }> =
    await prisma.$queryRaw`SELECT email FROM users WHERE email LIKE ${email}`;

  if (exsitingEmail[0]?.email === email) {
    return { message: "This email is already used." };
  }

  try {
    await prisma.$queryRaw`INSERT INTO 'users' (email, password, name)
    VALUES (${email}, ${await bcrypt.hash(password, 10)}, ${name})`;
  } catch {
    return { message: "Database Error: Failed to Sign you up." };
  }

  const user: Array<{ email: string }> =
    await prisma.$queryRaw`SELECT email FROM users WHERE email LIKE ${email}`;

  await createSession(user[0]?.email);
  redirect("/contents");
}

export async function login(formState: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.omit({ name: true }).safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields?.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { email, password } = validatedFields.data;

  const userPass: Array<{ password: string }> = await prisma.$queryRaw`
    SELECT password FROM users WHERE email LIKE ${email}`;

  const isPasswordMatches = await bcrypt.compare(password, userPass[0]?.password);

  if (!isPasswordMatches) {
    return { message: "Wrong email or password." };
  }

  await createSession(email);
  redirect("/contents");
}

export async function logout() {
  cookies().delete("session");
  redirect("/");
}
