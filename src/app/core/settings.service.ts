import { Injectable } from '@angular/core';
import { Settings } from '../shared/interfaces';
import { Theme, SidebarPosition } from "../shared/enums";

@Injectable()
export class SettingsService {

  constructor() { }

  getUserSettings() : Readonly<Settings> {
    return {
      theme: Theme.Dark,
      sidebarVisible: true,
      sidebarPosition: SidebarPosition.Left
    }
  }

}