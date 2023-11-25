import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Search } from '../search/search';
import { SearchService } from '../search.service';
import { AgentService } from '../agent.service';


@Component({
  selector: 'app-demo-search',
  templateUrl: './demo-search.component.html',
  styleUrls: ['./demo-search.component.css']
})
export class DemoSearchComponent implements OnInit {
  searchParams = {
    firstName: '',
    lastName: '',
    email: '' // Add other fields as needed
  };

  // for latepolicy
  lateSearchParams = {
    policyType: '',
    latePayment: ''
  };
  latePaymentResults: Search[] = [];




  // for high-value
  highValueClaims: Search[] = [];

  searchResults: any[] = []; // Adjust this type as needed for your actual data structure

  claimAmountThreshold: number = 2000; // Default value or you can leave it undefined


  // query4
  agents: any[] = [];
  gender: string = 'Male'; // Default gender
  isActive: boolean = true; // Default active status












  constructor(private http: HttpClient, private searchService: SearchService, private agentService: AgentService) {}
  ngOnInit(): void {
    this.getAgentsByGenderAndActiveStatus();
   
  }

  // late poliocy
  onSearchLatePayments() {
    // Construct the parameters based on user input
    const params = {
      policyType: this.lateSearchParams.policyType,
      latePayment: this.lateSearchParams.latePayment
    };
  
    // Call the search service with the new parameters
    this.searchService.getLatePayments(params).subscribe(
      (data) => {
        this.latePaymentResults = data;
      },
      (error) => {
        console.error('Error fetching late payments:', error);
      }
    );
  }
  

  onSearch() {
    // Replace 'http://localhost:8080' with the actual URL of your backend
    const searchUrl = 'http://localhost:8080/api/customers/search-query';
    this.http.get<any[]>(searchUrl, { params: this.searchParams }) // Use generics to inform TypeScript about the expected return type
      .subscribe(
        results => {
          this.searchResults = results;
        },
        error => {
          console.error('Search failed:', error);
        }
      );
  }

  oNSearch() {
    this.searchService.getHighValueClaims(this.claimAmountThreshold).subscribe(
      (claims) => {
        this.highValueClaims = claims;
      },
      (error) => {
        console.error('Error fetching high-value claims', error);
      }
    );
  }


  // 4th
  getAgentsByGenderAndActiveStatus() {
    this.agentService.findAgentsByGenderAndActiveStatus(this.gender, this.isActive)
      .subscribe((data) => {
        this.agents = data;
      });
  }



}