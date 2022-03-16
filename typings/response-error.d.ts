interface ResponseError extends Error {
  status?: number;
  info?: string;
}
