import { useEffect, useState } from "react";

export const useWebSocket = <T,>(
  url: string,
  onMessage: (data: T) => void
): [boolean, string | null] => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      setIsReady(true);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (e) {
        console.error("Failed to parse WebSocket message:", e, event.data);
      }
    };

    socket.onclose = () => {
      setIsReady(false);
      // console.log("WebSocket connection closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setError("WebSocket error occurred. Please try again later.");
    };

    // Cleanup
    return () => {
      socket.close();
    };
  }, []);

  return [isReady, error];
};
