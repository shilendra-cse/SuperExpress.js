export type Handler = () => void;

export type Route = {
  method: string;
  path: string;
  handler: Handler;
};
