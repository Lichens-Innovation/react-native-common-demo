const SWAPI_PEOPLE_URL = 'https://swapi.dev/api/people';

interface Person {
  name: string;
  url: string;
}

interface SwapiPeopleResponse {
  results: Person[];
  next: string | null;
}

const fetchPage = async (url: string): Promise<SwapiPeopleResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`SWAPI error: ${res.status}`);
  }
  const data: SwapiPeopleResponse = await res.json();
  return data;
};

export type CloudDropdownOption = { label: string; value: string };

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
