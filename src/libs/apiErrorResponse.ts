import { NextResponse } from "next/server";

export function invalidQuery(parameters: string[] = []) {
  const baseErrorMessage = "Invalid query parameters.";
  const errorMessage =
    parameters.length > 0
      ? `${baseErrorMessage} ${parameters.join(", ")} are required.`
      : `${baseErrorMessage}.`;

  return NextResponse.json(
    {
      error: true,
      errorMessage,
    },
    { status: 400 },
  );
}

export function invalidBody(parameters: string[] = []) {
  const baseErrorMessage = "Invalid body bad request.";
  const errorMessage =
    parameters.length > 0
      ? `${baseErrorMessage} ${parameters.join(", ")} are required.`
      : baseErrorMessage;

  return NextResponse.json(
    {
      error: true,
      errorMessage,
    },
    { status: 400 },
  );
}

export function invalidHeaders(parameters: string[] = []) {
  const baseErrorMessage = "Invalid headers.";
  const errorMessage =
    parameters.length > 0
      ? `${baseErrorMessage} ${parameters.join(", ")} are required.`
      : baseErrorMessage;

  return NextResponse.json(
    {
      error: true,
      errorMessage,
    },
    { status: 400 },
  );
}

export function unauthorizedUser() {
  return NextResponse.json(
    { error: true, errorMessage: "401 Unauthorized user." },
    { status: 401 },
  );
}

export function notFound(resource: string[] = []) {
  const errorMessage =
    resource.length === 0 ? "Not found." : `${resource.join(", ")} not found.`;

  return NextResponse.json(
    {
      error: true,
      errorMessage,
    },
    { status: 404 },
  );
}

export function serverError(errorMessage: string) {
  return NextResponse.json(
    {
      error: true,
      errorMessage,
    },
    { status: 500 },
  );
}

export function methodNotAllowed() {
  return NextResponse.json(
    {
      error: true,
      errorMessage: "Method not allowed.",
    },
    { status: 405 },
  );
}
