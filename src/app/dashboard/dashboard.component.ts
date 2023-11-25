import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js/auto';
import { CustomerService } from '../customer.service';
import { SearchService } from '../search.service';
import { PaymentService } from '../payment.service';
import { ClaimStatusCount } from '../claims/claim-status-count';
import { ClaimService } from '../claims.service';
import { PolicyService } from '../policy.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  greeting = '';
  totalUsers!: number;
  totalAgents!: number;
  totalPolices!: number;
  totalClaims!: number;
  customerName: any[] = [];
  searchResults: any[] = [];

  monthlyPaymentsChart: Chart | undefined;

  claimStatusCounts: ClaimStatusCount[] = []; 

  genderData: any[] = [];




  


  constructor(private http: HttpClient,private policyService: PolicyService, private claimService: ClaimService, private paymentService: PaymentService, private customerService: CustomerService, private searchService: SearchService ) { }

  ngOnInit(): void {
    this.setGreeting();
    this.fetchTotalUsers();
    this.fetchTotalAgents();
    this.fetchTotalPolicies();
    this.fetchTotalClaim();
    this.fetchRecentUsers();
    this.fetchRecentTransaction();
    this.createMonthlyPaymentsChart();
    this.fetchClaimStatusCounts();
    this.createPieChart();
    this.fetchGenderData();

  }

  ngAfterViewInit(): void {
    // Call this method after the view has been initialized
    
    
  }

  fetchClaimStatusCounts(): void {
    this.claimService.getClaimStatusCounts().subscribe(data => {
      this.claimStatusCounts = data;
      this.createPieChart(); // Call createPieChart after data is received
     
    });
  }


  


  createMonthlyPaymentsChart(): void {
    this.paymentService.getMonthlyPayments().subscribe(data => {
      const labels = Object.keys(data).sort();
      const dataPoints = labels.map(label => data[label]);

      this.monthlyPaymentsChart = new Chart('monthlyPaymentsCanvas', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Monthly Premiums Collected',
            data: dataPoints,
            backgroundColor: 'rgb(106, 90, 205)',
            //fill: false,
            borderColor: 'rgb(75, 192, 192)',
            //tension: 0.1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          responsive: true
        }
      });
    });
  }

  setGreeting(): void {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      this.greeting = 'Good Morning';
    } else if (currentHour < 17) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }
  }

  fetchRecentUsers(): void {
    this.customerService.getRecentUsers().subscribe(data => {
      this.customerName = data;
    });
  }

  //for showing recent transactions
  fetchRecentTransaction(): void {
    this.searchService.findAllPaymentsWithCustomerAndPolicy().subscribe((data) => {
        this.searchResults = data;
    });
  }

  // donut the chart


  fetchTotalUsers(): void {
    this.http.get<number>('http://localhost:8080/api/customers/dashboard/totalUsers').subscribe(data => {
      this.totalUsers = data;
    });
  }
  fetchTotalAgents(): void {
    this.http.get<number>('http://localhost:8080/api/agents/dashboard/totalAgents').subscribe(data2 => {
      this.totalAgents = data2;
    });
  }
  fetchTotalPolicies(): void {
    this.http.get<number>('http://localhost:8080/api/policies/dashboard/totalPolicy').subscribe(data3 => {
      this.totalPolices = data3;
    });
  
  
  }
  fetchTotalClaim(): void {
    this.http.get<number>('http://localhost:8080/api/claims/dashboard/totalClaims').subscribe(data4 => {
      this.totalClaims = data4;
    });
  }



  createPieChart(): void {
    const labels = this.claimStatusCounts.map(item => item.status);
    const dataPoints = this.claimStatusCounts.map(item => item.count);
    const backgroundColors = [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(143, 5, 86)',
      // Add more colors as needed
    ];
  
    // Check if there's an existing chart on the canvas and destroy it
    const existingChart = Chart.getChart('pieChart');
    if (existingChart) {
      existingChart.destroy();
    }
  
    const pieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: dataPoints,
            backgroundColor: backgroundColors,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }


  
//  gender
fetchGenderData(): void {
  this.customerService.getGenderCounts().subscribe((data) => {
    this.genderData = data;
    console.log("Check the data: "+this.genderData);
    this.updateGenderCharts();
  });
}
 

updateGenderCharts(): void {
  const labells = this.genderData.map((item) => item._id);
  const dataPoints = this.genderData.map((item) => item.count);
  console.log("Inside update: "+labells+" and "+dataPoints);

  // Create a canvas element to render the chart
  const ctx = document.getElementById('genderChart') as HTMLCanvasElement;
  const genderChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labells,
      datasets: [
        {
          label: 'Gender Count',
          data: dataPoints,
          backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Gender',
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Count',
          },
        },
      },
    },
  });
}

 



}



