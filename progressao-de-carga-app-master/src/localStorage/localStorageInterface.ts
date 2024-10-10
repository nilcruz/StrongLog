export interface ILocalStorage{
  key: string;
  set:(value:object) => void;
  get: () => object[] | object;
  delete: () => void;
}