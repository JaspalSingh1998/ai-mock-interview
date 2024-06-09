import { NextResponse } from "next/server";

export async function POST(req, res) {
   return new NextResponse(JSON.stringify('Response from backend'), {status: 200})
}