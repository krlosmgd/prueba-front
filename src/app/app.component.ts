import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SelectComponent } from './components/atoms/select/select.component';
import { CsvService } from './services/csv.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SelectComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'prueba-test';

  csvData: any[] = [];

  categories: any[] = [];

  selectCategory = '';

  selectItemsPage = 10;

  itemsPerPage = [
    5, 10, 15, 20, 50
  ];


  data: any[] = [];
  
  constructor(private csvService: CsvService) {}

  ngOnInit(): void {
      this.csvService.getCsvData('projects.csv').subscribe({
        next: (data)=>{
          this.csvData = data;
          this.categories = Array.from(new Set(data.map(d=> d.category)));
        },
        error: (error)=>{
          console.log('hay un error en la lectura del archivo ', error);
        }
      })
  }

  handleSelectorChange(event: any) {
    this.selectCategory = event.target.value;
    this.getDataByCategoryOrItemPerPage(this.selectCategory, this.selectItemsPage);
  }

  handleSelectorItemPerPage(event: any) {
    this.selectItemsPage = parseInt(event.target.value);
    this.getDataByCategoryOrItemPerPage(this.selectCategory, this.selectItemsPage);
  }

  getDataByCategoryOrItemPerPage(category: string, itemPerPage: number){
    this.data = this.csvData.filter(d=> d.category === category).sort((a,b)=> b.rating - a.rating).slice(0, itemPerPage);
  }
}
