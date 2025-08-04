export function getItem<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key)
    return item ? (JSON.parse(item as string) as T) : null;
  } catch (error) {
    console.log(`Error ao tentar dar get no item '${key}' do localStorage`, error)
    return null
  }
}

export function setItem<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(`Error ao tentar dar set no item '${key}' do localStorage`, error)
  }
}
