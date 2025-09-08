export interface WebhookPayload {
  text_content: string;
  source?: string;
  current_dir: string;
}

export interface WebhookOptions {
  url?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

/**
 * Send a webhook with the specified payload
 */
export async function sendWebhook(
  payload: WebhookPayload,
  options: WebhookOptions = {}
): Promise<any> {

  if (!payload.text_content) {
    return {}
  }

  const baseUrl = process.env['NEIGHBOUR_SERVER_BASE_URL'];
  const url = options.url || `${baseUrl}logger/cli_webhook`;
  
  const timeout = options.timeout || 15000; // 15 seconds
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
  }
}
