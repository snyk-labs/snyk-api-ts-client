class ClientError extends Error {
  data: {};
  constructor(message: any) {
    super(message);
    this.name = 'Error';
    this.message = message || '';
    this.data = message.data || '';
  }
}

export { ClientError };
