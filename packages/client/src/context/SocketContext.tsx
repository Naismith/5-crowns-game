import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface Context {
  socket: Socket;
}

const SocketContext = createContext<Context | undefined>(undefined);

export const useSocketContext = () => {
  const context = useContext(SocketContext);

  if (!context)
    throw new Error("This must be used insided of the socket context");

  return context;
};

export const Provider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(`ws://192.168.1.2:4000`, {
      reconnectionDelayMax: 10000,
    });

    setSocket(newSocket);
  }, []);

  if (!socket) return <div>Loading</div>;

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
