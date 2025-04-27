/* eslint-disable react-refresh/only-export-components */
// SocketContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Socket } from "socket.io-client";
import socket from "src/utils/socket.util";

// Define the shape of our context
interface SocketContextType {
  socket: Socket;
  isConnected: boolean;
}

// Create context with default values
const SocketContext = createContext<SocketContextType | undefined>(undefined);

// Define props for the provider component
interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  useEffect(() => {
    // Setup event listeners
    const onConnect = () => {
      setIsConnected(true);
      console.log("Socket connected");
    };

    const onDisconnect = () => {
      setIsConnected(false);
      console.log("Socket disconnected");
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // If socket is not connected, connect it
    if (!socket.connected) {
      socket.connect();
    }

    // Cleanup function to remove listeners when component unmounts
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      // Note: We're not disconnecting the socket here, as it might be used elsewhere
      // If you want to disconnect when your app shuts down, handle it in a top-level component
    };
  }, []);

  // Value to be provided by the context
  const value = {
    socket,
    isConnected,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

// Custom hook to use the socket context
export const useSocket = () => {
  const context = useContext(SocketContext);

  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }

  return context;
};
