import React from "react";

interface ProtectedRouteProps {
   children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
   //auth check logic
   //redirect logic
   return children
}