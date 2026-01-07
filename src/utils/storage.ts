export interface LocalStorage {
  cities?: string[]
}

export type localStorageKeys = keyof LocalStorage

export function setStoredCities(cities: string[]): Promise<void> {
  const vals: LocalStorage = {
    cities,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(
      {
        cities,
      },
      () => {
        resolve()
      },
    )
  })
}

export function getStoredCities(): Promise<string[]> {
  const keys: localStorageKeys[] = ['cities']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.cities ?? [])
    })
  })
}
