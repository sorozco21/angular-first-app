import { Component, inject } from '@angular/core';
import { CommonModule} from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
@Component({
  selector: 'app-home',
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  housingService = inject(HousingService)
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }
  filterResults(text: string){
    if(!text) this.filteredLocationList = this.housingLocationList;
    console.log(text);
    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.name.toLowerCase().includes(text.toLowerCase()) ||
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()) ||
      housingLocation?.state.toLowerCase().includes(text.toLowerCase())
    );
  }
}

