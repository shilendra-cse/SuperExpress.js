export interface Response {
  statusCode: number;
  headers: Record<string, string>;
  status(code: number): Response;
  send(body: string): void;
}

export type Handler = (res: Response) => void;

export type Route = {
  method: string;
  path: string;
  handler: Handler;
};
