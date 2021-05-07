export interface Repository<T> {
  findOne: (id: number) => T | undefined;
}
