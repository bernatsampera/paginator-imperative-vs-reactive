import { InMemoryDbService } from 'angular-in-memory-web-api';

export class AppData implements InMemoryDbService {

  createDb() {
    const continents: Array<string> = [
      'asia',
      'antartica',
      'europe',
      'africa',
      'america',
      'oceania'
    ];
    return {continents};
  }
}
