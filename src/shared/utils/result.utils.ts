export class Result<T> {
  private constructor(
    private readonly _isSuccess: boolean,
    private readonly _error?: string,
    private readonly value?: T
  ) {}

  public isSuccess(): boolean {
    return this._isSuccess;
  }

  public getValue(): T {
    if (!this._isSuccess) {
      throw new Error('Cannot get value of an error result');
    }
    return this.value!;
  }

  public getError(): string {
    if (this._isSuccess) {
      throw new Error('Cannot get error of a success result');
    }
    return this._error!;
  }

  public static ok<U>(value: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error);
  }
}
