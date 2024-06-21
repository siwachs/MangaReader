import { auth } from "./auth";

export default async function getServerSession(
  userId: string | null | undefined = null,
) {
  const serverSession = await auth();

  if (!userId) return serverSession;

  if (serverSession?.user.id !== userId) return null;

  return serverSession;
}
