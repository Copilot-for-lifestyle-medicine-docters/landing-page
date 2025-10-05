import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    await request.json();
  } else if (contentType?.includes("application/x-www-form-urlencoded")) {
    await request.formData();
  }

  return NextResponse.json(
    {
      status: "queued",
      message: "Thanks for reaching out! A member of the Eliksir team will reply shortly.",
      note: "This endpoint is a stub. Connect it to your CRM or email provider."
    },
    { status: 202 }
  );
}
