import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET({ params }: { params: { reportId: string } }) {
  try {
    const report = await db.report.findUnique({
      where: { reportId: params.reportId },
    });

    if (!report) {
      return NextResponse.json(
        {
          error: "Report not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(report);
  } catch (error) {
    console.log("Error fetching report details:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch report details",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status } = await request.json();
    const report = await db.report.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json(report);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating report" },
      { status: 500 }
    );
  }
}
