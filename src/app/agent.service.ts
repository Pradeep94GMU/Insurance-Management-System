import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agent } from './agent/agent';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  
  private apiUrl = 'http://localhost:8080/api/agents';

  constructor(private http: HttpClient) {}

  getAgents(): Observable<Agent[]> {
    return this.http.get<Agent[]>(this.apiUrl);
  }

  createAgent(agent: Agent): Observable<Agent> {
    return this.http.post<Agent>(this.apiUrl, agent);
  }

  updateAgent(id: string, agent: Agent): Observable<Agent> {
    return this.http.put<Agent>(`${this.apiUrl}/${id}`, agent);
  }

  deleteAgent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}