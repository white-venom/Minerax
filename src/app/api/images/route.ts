import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

const IMAGE_PATHS = {
  furnace: "/home/kartik/.gemini/antigravity/brain/b5e23090-a24b-4b95-b710-f0f91f359c22/smelting_furnace_molten_steel_1780102010348.png",
  robotic: "/home/kartik/.gemini/antigravity/brain/b5e23090-a24b-4b95-b710-f0f91f359c22/robotic_casting_foundry_1780102033567.png",
  heavy: "/home/kartik/.gemini/antigravity/brain/b5e23090-a24b-4b95-b710-f0f91f359c22/heavy_engineering_cast_steel_1780102052670.png"
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
