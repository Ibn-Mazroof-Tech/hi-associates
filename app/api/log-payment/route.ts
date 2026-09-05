import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const webhookUrl = process.env.GOOGLE_PAYMENTS_SHEET_WEBHOOK_URL;

    if (!webhookUrl) {
      // Don't treat this as a hard failure — the payment itself already
      // succeeded via Razorpay before this is ever called. A missing
      // webhook just means the row won't be logged yet.
      console.warn(
        "GOOGLE_PAYMENTS_SHEET_WEBHOOK_URL is not set — payment was not logged to Sheets."
      );
      return NextResponse.json({ result: "skipped" });
    }

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Payment logging failed:", error);
    return NextResponse.json({ result: "error" }, { status: 500 });
  }
}
