import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfacesDataService } from './core/interfaces-data.service';
import { CharactersPlanets, Character, Settings } from './shared/interfaces';
import { Theme, SidebarPosition } from './shared/enums';
import { SettingsService } from './core/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {

  charactersAndPlanets$: Observable<CharactersPlanets> = new Observable<CharactersPlanets>();
  userSettings: Readonly<Settings> =
    { theme: Theme.Dark, sidebarVisible: true, sidebarPosition: SidebarPosition.Left };
  theme = Theme;
  sidebarPosition = SidebarPosition;

  constructor(private dataService: InterfacesDataService, private settingsService: SettingsService) { }

  ngOnInit() {
    this.charactersAndPlanets$ = this.dataService.getCharactersAndPlanets();
    this.userSettings = this.settingsService.getUserSettings();
    
    // Uncomment the following line to see the error
    // Cannot update the object because it is readonly
    // this.userSettings.theme = Theme.Light;

    // Pass "partial" character to function
    let character: Partial<Character> = {
       name: 'Luke Skywalker',
       height: '170',
       mass: '75'
    };
    this.dataService.updateCharacter(character).subscribe(char => console.log('Updated: ', char));
  }

}
