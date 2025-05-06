

class InMemoryCache {
    private map = new Map<string, { data: any; timestamp: number }>();
    private readonly ttl = 5 * 60 * 1000;
  
    get(key: string) {
      const entry = this.map.get(key);
      if (!entry) return null;
      const expired = Date.now() - entry.timestamp > this.ttl;
      if (expired) {
        this.map.delete(key);
        return null;
      }
      return entry.data;
    }
  
    set(key: string, data: any) {
      this.map.set(key, { data, timestamp: Date.now() });
    }
  }
  
  export const cache = new InMemoryCache();
  