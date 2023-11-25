// agent.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agent } from './agent/agent';


@Injectable({
  providedIn: 'root',
})
export class AgentService {
  private apiUrl = 'http://localhost:8080/api/agents';

  constructor(private http: HttpClient) {}

  getAllAgents(): Observable<Agent[]> {
    return this.http.get<Agent[]>(this.apiUrl);
  }

  getAgentById(id: string): Observable<Agent> {
    return this.http.get<Agent>(`${this.apiUrl}/${id}`);
  }

  
  createAgent(newAgent: Agent): Observable<any> {
    return this.http.post(this.apiUrl, newAgent);
  }
  updateAgent(id: string, agent: Agent): Observable<Agent> {
    return this.http.put<Agent>(`${this.apiUrl}/${id}`, agent);
  }

  deleteAgent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  findAgentsByGenderAndActiveStatus(gender: string, isActive: boolean): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/agents-pol-cus?gender=${gender}&isActive=${isActive}`);
  }





}
