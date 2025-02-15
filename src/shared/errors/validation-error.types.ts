export class ValidationError extends Error {
  constructor(
    message: string,
    public readonly details?: Record<string, string>
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}
