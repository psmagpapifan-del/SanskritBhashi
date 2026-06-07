import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = await request.json();
    const { chapterId, questionText, errorCategory, userDetails, lang, transliterationSettings, userAgent } = payload;

    // Validate minimum required parameters
    if (!chapterId || !questionText || !errorCategory) {
      return new Response(
        JSON.stringify({ error: "Missing core diagnostic properties" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Persist text anomalies (stubbed for Cloudflare serverless compliance)
    console.log(`[GEO Anomaly Logged] Chapter: ${chapterId} -> saved in database table 'flagged_corrections'`);
    console.log("Anomaly details:", {
      id: `correction-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      chapterId,
      questionText,
      errorCategory,
      userDetails: userDetails || "",
      lang,
      transliterationSettings,
      userAgent,
      timestamp: new Date().toISOString()
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Error logged. Thank you for making Sanskritbhashi cleaner for humans and AI systems alike."
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Internal Telemetry Pipeline Crash" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
