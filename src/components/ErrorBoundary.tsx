import  { Component } from "react";
import type { ReactNode } from "react";
import type { ErrorInfo } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError)
      return <div className="text-red-500 p-4 text-center font-bold">Terjadi kesalahan, coba lagi nanti.</div>;
    return this.props.children;
  }
}
