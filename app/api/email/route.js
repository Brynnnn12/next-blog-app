import { NextResponse } from "next/server";
import EmailModel from "@/lib/models/EmailModel";

import { ConnectDB } from "@/lib/config/db";

const LoadDB = async () => {
  await ConnectDB();
};
LoadDB();

export async function POST(request) {
  const formData = await request.formData();
  const emailData = {
    email: `${formData.get("email")}`,
  };

  const savedEmail = await EmailModel.create(emailData);
  return NextResponse.json({
    success: true,
    msg: "Email saved successfully",
    data: savedEmail,
  });
}

export async function GET(request) {
  const emails = await EmailModel.find({});
  return NextResponse.json({
    success: true,
    msg: "All emails",
    data: emails,
  });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  const deletedEmail = await EmailModel.findByIdAndDelete(id);
  return NextResponse.json({
    success: true,
    msg: "Email deleted successfully",
    data: deletedEmail,
  });
}
