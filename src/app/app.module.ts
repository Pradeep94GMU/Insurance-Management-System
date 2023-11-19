import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PolicyComponent } from './policy/policy.component';
import { CustomerComponent } from './customer/customer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { CustomerService } from './customer.service';
import { PolicyService } from './policy.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgentComponent } from './agent/agent.component';

@NgModule({
  declarations: [
    AppComponent,
    PolicyComponent,
    CustomerComponent,
    DashboardComponent,
    AgentComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    CustomerService,
    PolicyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
