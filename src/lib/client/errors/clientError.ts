class ClientError extends Error {
  data: {};
  requestId?: string;

  constructor(message: any) {
    super(message);
    this.name = 'Error';
    this.message = message || '';
    this.data = message.data || '';
    this.requestId = message.requestId || '';
  }
}

export { ClientError };
