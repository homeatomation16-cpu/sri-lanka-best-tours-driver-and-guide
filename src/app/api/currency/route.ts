import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // URL එකෙන් parameters ලබා ගැනීම (e.g., ?from=USD&to=LKR&amount=100)
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from") || "USD";
  const to = searchParams.get("to") || "LKR";
  const amount = parseFloat(searchParams.get("amount") || "1");

  // ඔබ ලබා දුන් පෞද්ගලික API Key එක
  const API_KEY = "4cec68546b316a3c8cb4c4a2";

  try {
    // ExchangeRate-API V6 'pair' endpoint එක භාවිතා කිරීම
    // මෙය ඉතා නිවැරදිව අදාළ මුදල් වර්ග දෙක අතර හුවමාරු අගය ගණනය කර ලබා දෙයි.
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${amount}`,
      {
        // දත්ත පැයකට වරක් Cache කිරීමට (Performance සහ Quota පිරිමසා ගැනීමට)
        next: { revalidate: 3600 } 
      }
    );

    const data = await response.json();

    // API එකෙන් දෝෂයක් ආවොත් එය හඳුනා ගැනීම
    if (data.result === "error") {
      console.error("Currency API Error Type:", data["error-type"]);
      return NextResponse.json(
        { error: data["error-type"] || "Failed to fetch rates" },
        { status: 400 }
      );
    }

    // සාර්ථක ප්‍රතිඵලය JSON ලෙස යැවීම
    return NextResponse.json({
      from: data.base_code,
      to: data.target_code,
      amount: amount,
      rate: data.conversion_rate,
      result: data.conversion_result,
      last_updated: data.time_last_update_utc
    });

  } catch (error) {
    console.error("Currency API Fetch Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}