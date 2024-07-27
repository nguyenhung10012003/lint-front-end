interface Url {
  url: string;
  params?: {
    [key: string]: string | number | boolean | string[] | number[];
  };
  body?: any;
}
