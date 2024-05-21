class LocalStorageRepository {
  public setOne(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getOne(key: string): any {
    const value = localStorage.getItem(key);

    if(value) {
      return JSON.parse(value);
    }

    return {};
  }
}

export const localStorageRepository: LocalStorageRepository = new LocalStorageRepository();
