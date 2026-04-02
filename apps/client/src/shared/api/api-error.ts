export class ApiError extends Error {
  constructor(
    public status: number | undefined,
    message: string
  ) {
    super(message);
  }
}
