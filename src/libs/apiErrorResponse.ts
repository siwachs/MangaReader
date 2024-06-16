import { NextResponse } from "next/server";

export function invalidQuery(parameters: string[] = []) {
  return NextResponse.json(
    {
      error: true,
      errorMessage: `Invalid query parameters${parameters.length === 0 ? "." : ` ${parameters.join(", ")} are required.`}`,
    },
    { status: 400 },
  );
}

export function invalidBody(parameters: string[] = []) {
  return NextResponse.json(
    {
      error: true,
      errorMessage: `Invalid body bad request.${parameters.length === 0 ? "" : ` ${parameters.join(", ")} are required.`}`,
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
  return NextResponse.json(
    {
      error: true,
      errorMessage: `${resource.length === 0 ? "" : `${resource.join(", ")} `}not found.`,
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
