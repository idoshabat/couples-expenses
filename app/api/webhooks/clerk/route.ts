import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.text();
  const heads = await headers();
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

  let evt: { type: string; data: any };
  try {
    evt = wh.verify(payload, {
      "svix-id": heads.get("svix-id")!,
      "svix-timestamp": heads.get("svix-timestamp")!,
      "svix-signature": heads.get("svix-signature")!,
    }) as { type: string; data: any };
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (evt.type === "user.created") {
    console.log("User created:", evt.data);
  } else if (evt.type === "user.updated") {
    console.log("User updated:", evt.data);
  } else if (evt.type === "user.deleted") {
    console.log("User deleted:", evt.data);
  } else {
    console.warn("Unhandled event type:", evt.type);
  }

  return NextResponse.json({ ok: true });
}
