import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

const IMAGE_PATHS = {
  furnace: "./public/furnace.png",
  robotic: "./public/robotic.png",
  heavy: "./public/heavy.png"
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id || !(id in IMAGE_PATHS)) {
    return new NextResponse("Image not found", { status: 404 });
  }

  const filePath = IMAGE_PATHS[id as keyof typeof IMAGE_PATHS];

  try {
    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });
  } catch (error) {
    return new NextResponse("Error reading file", { status: 500 });
  }
}
