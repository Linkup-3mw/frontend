declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_CLIENT_URL: string;
    }
  }
}

export {};
