export interface Repository<T> {
  findOne: (id: number) => Promise<T | null>;
}
