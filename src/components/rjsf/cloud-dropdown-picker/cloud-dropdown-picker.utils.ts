const SWAPI_PEOPLE_URL = 'https://swapi.dev/api/people';

interface Person {
  name: string;
  url: string;
}

interface SwapiPeopleResponse {
  results: Person[];
  next: string | null;
}

export type CloudDropdownOption = { label: string; value: string };

/** FormData for CloudDropdownPicker: value + computed updatedAt (ISO-8601) */
export type CloudDropdownFormData = {
  value?: string;
  updatedAt?: string;
};

const fetchPage = async (url: string): Promise<SwapiPeopleResponse> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`SWAPI error: ${res.status}`);
  return (await res.json()) as SwapiPeopleResponse;
};

export const fetchCloudDropdownOptions = async (): Promise<CloudDropdownOption[]> => {
  const options: CloudDropdownOption[] = [];
  let nextPageUrl: string | null = SWAPI_PEOPLE_URL;

  while (nextPageUrl) {
    const data = await fetchPage(nextPageUrl);
    for (const person of data.results) {
      options.push({ value: person.url, label: person.name });
    }
    nextPageUrl = data.next;
  }

  return options;
};

const isCloudDropdownFormData = (x: unknown): x is CloudDropdownFormData =>
  typeof x === 'object' && x !== null && !Array.isArray(x);

export const getCloudDropdownValue = (formData: unknown): string | undefined => {
  if (formData === null) return undefined;
  if (isCloudDropdownFormData(formData)) return formData.value;
  if (typeof formData === 'string') return formData;
  return undefined;
};

export const getCloudDropdownUpdatedAt = (formData: unknown): string | undefined => {
  if (!isCloudDropdownFormData(formData)) return undefined;
  return typeof formData.updatedAt === 'string' ? formData.updatedAt : undefined;
};

export const buildCloudDropdownFormData = (value?: string): CloudDropdownFormData => ({
  value,
  updatedAt: new Date().toISOString(),
});
