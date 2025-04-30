declare global {
  type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

  type Page = {
    searchParams: SearchParams;
  };
}

export {};
