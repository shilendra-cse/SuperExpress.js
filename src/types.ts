export interface Response {
  send(body: string): void;
}

export type Handler = (res: Response) => void;

export type Route = {
  method: string;
  path: string;
  handler: Handler;
};
