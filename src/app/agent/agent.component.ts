// agent.component.ts

import { Component, OnInit } from '@angular/core';
import { AgentService } from '../agent.service';
import { Agent } from './agent';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css'],
})
export class AgentComponent implements OnInit {
  agents: Agent[] = [];
  newAgent: Agent = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    policyIds: [],
  };
  selectedAgent: Agent | null = null;
  showCreate: boolean = false;
  policyIdsString: string = '';

  constructor(private agentService: AgentService) {}

  ngOnInit(): void {
    this.loadAgents();
  }

  loadAgents(): void {
    this.agentService.getAllAgents().subscribe((data) => {
      this.agents = data;
    });
  }

  selectAgent(agent: Agent): void {
    this.selectedAgent = agent;
  }

  showCreateForm(): void {
    this.showCreate = true;
  }

  createAgent(): void {
    // Implement agent creation logic using this.newAgent and this.policyIdsString
    // ...

    // Reset values and update agent list
    this.newAgent = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      policyIds: [],
    };
    this.policyIdsString = '';
    this.loadAgents();

    // Hide the create form
    this.showCreate = false;
  }

  cancelCreate(): void {
    // Reset values and hide the create form
    this.newAgent = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      policyIds: [],
    };
    this.policyIdsString = '';
    this.showCreate = false;
  }

  cancelUpdate(): void {
    // Reset selected agent
    this.selectedAgent = null;
  }

  updateAgent(): void {
    if (this.selectedAgent) {
      // Implement agent update logic using this.selectedAgent
      // ...

      // Reset selected agent and update agent list
      this.selectedAgent = null;
      this.loadAgents();
    }
  }

  deleteAgent(): void {
    if (this.selectedAgent) {
      // Implement agent deletion logic using this.selectedAgent.id
      // ...

      // Reset selected agent and update agent list
      this.selectedAgent = null;
      this.loadAgents();
    }
  }
}
