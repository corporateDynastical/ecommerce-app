import prisma from "@/prisma";

export const connectToDb = async () => {
  try {
    await prisma.$connect().then(() => console.log("Database Connected"));
  } catch (error: any) {
    console.log("Error Connecting Database");
    return new Error(error.message);
  }
};
