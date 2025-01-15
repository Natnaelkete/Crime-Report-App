import { User } from "@prisma/client";

interface userDataProps {
  userData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
}

export const signupUser = async ({ userData }: userDataProps) => {
  if (userData.password !== userData.confirmPassword) {
    throw new Error("Password do not match");
  }

  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to sign up"
    );
  }
};
