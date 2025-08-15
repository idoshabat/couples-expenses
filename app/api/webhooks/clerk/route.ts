import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

interface ClerkEvent<T = unknown> {
  type: string;
  data: T;
}

export async function POST(req: Request) {
  const payload = await req.text();
  const heads = await headers();
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

  let evt: ClerkEvent;
  try {
    evt = wh.verify(payload, {
      "svix-id": heads.get("svix-id")!,
      "svix-timestamp": heads.get("svix-timestamp")!,
      "svix-signature": heads.get("svix-signature")!,
    }) as ClerkEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (evt.type) {
    case "user.created":
      console.log("User created:", evt.data);
      break;
    case "user.updated":
      console.log("User updated:", evt.data);
      break;
    case "user.deleted":
      console.log("User deleted:", evt.data);
      break;
    default:
      console.warn("Unhandled event type:", evt.type);
  }

  return NextResponse.json({ ok: true });
}
