import { revalidatePath, revalidateTag } from "next/cache";
import { createHmac, timingSafeEqual } from "node:crypto";

import { DASHBOARD_CACHE_TAG } from "@/lib/get-dashboard-data";

export const runtime = "nodejs";

const DASHBOARD_WEBHOOK_EVENTS = new Set([
  "issues",
  "issue_comment",
  "pull_request",
  "pull_request_review",
  "pull_request_review_comment",
  "push",
]);

function isValidSignature(payload: string, signature: string, secret: string) {
  const expected = `sha256=${createHmac("sha256", secret)
    .update(payload)
    .digest("hex")}`;

  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);

  if (expectedBuffer.length !== signatureBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, signatureBuffer);
}

export async function POST(request: Request) {
  const event = request.headers.get("x-github-event");
  const signature = request.headers.get("x-hub-signature-256");
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  const payload = await request.text();

  if (event === "ping") {
    return Response.json({ ok: true, event });
  }

  if (!secret) {
    return Response.json(
      {
        error: "Missing GITHUB_WEBHOOK_SECRET.",
      },
      { status: 503 },
    );
  }

  if (!signature || !isValidSignature(payload, signature, secret)) {
    return Response.json(
      {
        error: "Invalid webhook signature.",
      },
      { status: 401 },
    );
  }

  if (!event || !DASHBOARD_WEBHOOK_EVENTS.has(event)) {
    return Response.json({ ok: true, ignored: true, event });
  }

  revalidateTag(DASHBOARD_CACHE_TAG, "max");
  revalidatePath("/dashboard");

  return Response.json({ ok: true, revalidated: true, event });
}
