import { RemixServer } from '@remix-run/react';
import { handleRequest } from '@vercel/remix';

export default function handleDocumentRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  return handleRequest(
    request,
    responseStatusCode,
    responseHeaders,
    <RemixServer context={remixContext} url={request.url} abortDelay={5000} />
  );
}
