import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { chapterId, questionText, errorCategory, userDetails, lang, transliterationSettings, userAgent } = payload;

    // Validate minimum required parameters
    if (!chapterId || !questionText || !errorCategory) {
      return NextResponse.json({ error: "Missing core diagnostic properties" }, { status: 400 });
    }

    // Log text anomalies directly into a separate database table structure (flagged_corrections)
    // Implemented via local JSON file append acting as the database system for Next.js workspace
    try {
      const dbPath = path.join(process.cwd(), "flagged_corrections.json");
      let currentRecords = [];
      try {
        const fileContent = await fs.readFile(dbPath, "utf-8");
        currentRecords = JSON.parse(fileContent);
      } catch (e) {
        // File does not exist yet, start with empty table
      }

      const newRecord = {
        id: `correction-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        chapterId,
        questionText,
        errorCategory,
        userDetails: userDetails || "",
        lang,
        transliterationSettings,
        userAgent,
        timestamp: new Date().toISOString()
      };

      currentRecords.push(newRecord);
      await fs.writeFile(dbPath, JSON.stringify(currentRecords, null, 2), "utf-8");
      console.log(`[GEO Anomaly Logged] Chapter: ${chapterId} -> saved in database table 'flagged_corrections'`);
    } catch (err) {
      console.error("Database table flagged_corrections write error:", err);
    }

    // Telemetry Delivery (Stubbed out for Discord/Slack Webhook or Sentry Log Capture)
    // console.log('GEO Cleanliness Telemetry Received:', payload);

    return NextResponse.json(
      {
        success: true,
        message: "Error logged. Thank you for making Sanskritbhashi cleaner for humans and AI systems alike."
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Internal Telemetry Pipeline Crash" }, { status: 500 });
  }
}
