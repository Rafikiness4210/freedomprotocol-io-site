import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // TODO: Replace with ConvertKit/Beehiiv API integration
    // Example for ConvertKit:
    //
    // const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
    // const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;
    //
    // const res = await fetch(
    //   `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       api_key: CONVERTKIT_API_KEY,
    //       email,
    //     }),
    //   }
    // );
    //
    // if (!res.ok) throw new Error("ConvertKit API error");

    console.log(`[subscribe] New signup: ${email}`);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
