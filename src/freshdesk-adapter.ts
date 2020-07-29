import axios, { AxiosInstance } from 'axios';

class AuthorizationConfiguration {
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
}

interface AdapterOptions {
  subdomain: string,
  apiKey: string
}

export = class FreshdeskAdapter {
  private authorization: AuthorizationConfiguration;
  private baseAPIUrl: string;
  private baseUrl: string;
  private host: AxiosInstance;
  private subdomain: string;

  constructor({ subdomain, apiKey }: AdapterOptions) {
    this.subdomain = subdomain;
    this.baseUrl = `https://${this.subdomain}.freshdesk.com`
    this.baseAPIUrl = `https://${this.subdomain}.freshdesk.com/api/v2/`;
    this.authorization = new AuthorizationConfiguration(apiKey);

    this.host = axios.create({
      baseURL: this.baseAPIUrl,
      headers: { Authorization: `Basic ${this.authorization.apiKey}` }
    })
  }

  async ticketsForJIRA(jiraID: string): Promise<[string]> {
    const response = await this.host.get(`search/tickets?query="tag:'${jiraID}'"`);
    const data = response.data;
    const results = data.results;

    return results.map((ticketData: { id: string }) => {
      return `${this.baseUrl}/a/tickets/${ticketData.id}`;
    });
  }
}
