
export type UserStorageData = Record<string, unknown>

class InMemoryUserStorage {
    private map = new Map<string, UserStorageData>();

    save(token: string, data: UserStorageData) {
        this.map.set(token, data);
    }

    get(token: string): UserStorageData | undefined {
        return this.map.get(token);
    }

}

export const userStorage = new InMemoryUserStorage();
