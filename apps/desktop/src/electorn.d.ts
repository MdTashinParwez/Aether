
export {};

declare global {
  interface Window {
    aether: {
      getAppName: () => string;
      openTarget: (
        target: "vscode" | "leetcode" | "chatgpt"
      ) => Promise<{
        success: boolean;
        message: string;
      }>;
      startDSA: () => Promise<{
        success: boolean;
        message: string;
      }>;
    };
  }
}
