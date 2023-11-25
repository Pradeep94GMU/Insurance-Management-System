import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { PolicyComponent } from './policy/policy.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentComponent } from './payment/payment.component';
import { AgentComponent } from './agent/agent.component';
import { ClaimsComponent } from './claims/claims.component';
import { SearchComponent } from './search/search.component';
import { DemoSearchComponent } from './demo-search/demo-search.component';
import { TabsComponent } from './tabs/tabs.component';

const routes: Routes = [
  
  
  {path: '', redirectTo: '/dashboard', pathMatch:'full'},
  {path: 'customer', component:CustomerComponent},
  {path: 'policy', component:PolicyComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'payment', component:PaymentComponent},
  {path: 'agent', component:AgentComponent},
  {path: 'claims', component:ClaimsComponent},
  {path: 'search', component:SearchComponent},
  {path: 'demoSearch', component:DemoSearchComponent},
  {path: 'tabs', component:TabsComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
