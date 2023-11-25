// search.component.ts
/*import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { Search } from './search';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  
  searchResults:Search[]=[];
  loading = true;
  error: string='';

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.findAllPaymentsWithCustomerAndPolicy().subscribe(
      (data) => {
        this.searchResults = data;
        console.log(data)
        //this.loading = false;
      },
      (error) => {
        console.error('Error fetching search results:', error);
        //this.loading = false;
        this.error = 'An error occurred while fetching results.';
      }
    );
  }
}*/
// search.component.ts
import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { Search } from './search';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchResults: Search[] = [];
  loading = true;
  error: string = '';
  activeTable: string = ''; // Track the active table
  policyType: string = ''; // Track the selected policy type
    isLatePayment: boolean | null = null; 

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    // Initialization logic if needed
  }

  loadTable(tableName: string): void {
    this.activeTable = tableName;
    this.loading = true;

    switch (tableName) {
      case 'payments':
        this.searchService.findAllPaymentsWithCustomerAndPolicy().subscribe(
          (data) => {
            this.searchResults = data;
            this.loading = false;
          },
          (error) => {
            console.error('Error fetching payments with customer and policy details:', error);
            this.loading = false;
            this.error = 'An error occurred while fetching results.';
          }
        );
        break;

      case 'latePayments':
        this.searchService.findLatePaymentsWithDetails().subscribe(
          (data) => {
            this.searchResults = data;
            this.loading = false;
          },
          (error) => {
            console.error('Error fetching late payments with details:', error);
            this.loading = false;
            this.error = 'An error occurred while fetching results.';
          }
        );
        break;

      case 'highValueClaims':
        this.searchService.findHighValueClaims().subscribe(
          (data: Search[]) => {
            this.searchResults = data;
            this.loading = false;
          },
          (error: any) => {
            this.error = 'An error occurred while fetching data.';
            this.loading = false;
          }
        );
        break;

      // Add more cases for other tables if needed

      default:
        break;
    }
  }
}
