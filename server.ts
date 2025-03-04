import { serve } from "https://deno.land/std@0.152.0/http/server.ts";

const PORT = 8000;

const handler = async (req: Request): Promise<Response> => {
  const filePath = `./${new URL(req.url).pathname}`;

  try {
    const file = await Deno.readFile(filePath);
    return new Response(file, {
      headers: { "Content-Type": getContentType(filePath) },
    });
  } catch {
    return new Response("Not Found", { status: 404 });
  }
};

console.log(`Server running at http://localhost:${PORT}`);
await serve(handler, { port: PORT });

// Helper function to determine content type based on file extension
function getContentType(filePath: string): string {
  if (filePath.endsWith(".html")) return "text/html";
  if (filePath.endsWith(".css")) return "text/css";
  if (filePath.endsWith(".js") || filePath.endsWith(".ts")) return "application/javascript";
  if (filePath.endsWith(".png")) return "image/png";
  if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) return "image/jpeg";
  if (filePath.endsWith(".woff")) return "font/woff";
  return "text/plain";
}
