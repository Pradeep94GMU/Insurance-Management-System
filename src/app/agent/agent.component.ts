import { Component, OnInit } from '@angular/core';
import { Agent } from './agent';
import { AgentService } from '../agent.service';


@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})

export class AgentComponent implements OnInit {
  showForm: boolean = false;
  agent: Agent = { id: '', firstName: '', lastName: '', email: '', policyIds: [] };
  policyIdsString: string = ''; // For handling the comma-separated string from the UI
  agents: Agent[] = []; 

  constructor(private agentService: AgentService) { }

  ngOnInit(): void {
    this.getAgents();
  }

  getAgents(): void {
    this.agentService.getAgents().subscribe(agents => {
      this.agents = agents;
    });
  }

  saveAgent(): void {
    this.agent.policyIds = this.policyIdsString.split(',').map(id => id.trim());
    this.agentService.createAgent(this.agent).subscribe(result => {
      console.log(result);
      this.getAgents(); // Refresh the list of agents
      this.agent = { id: '', firstName: '', lastName: '', email: '', policyIds: [] }; // Reset the form
      this.policyIdsString = ''; // Reset the policyIds input
    }, error => {
      console.error(error);
    });
  }

  editAgent(agent: Agent): void {
    this.agent = {...agent}; // Copy the agent data to the form
    this.policyIdsString = agent.policyIds.join(', '); // Convert policyIds array to string
  }

  deleteAgent(agentId: string): void {
    this.agentService.deleteAgent(agentId).subscribe(() => {
      this.getAgents(); // Refresh the list after deletion
    }, error => {
      console.error(error);
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }





}





  // showForm: boolean = false;
  // agents: Agent[] = [];

  // selectedAgent: Agent = this.getEmptyAgent();
  
  // constructor(private agentService: AgentService) {}

  // ngOnInit(): void {
  //   this.loadAgents();
  // }

  // getEmptyAgent(): Agent {
  //   return {
  //     id:'',
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     policyIds: ''
  //   };
  // }

  // loadAgents(): void {
  //   this.agentService.getAgents().subscribe(agents => this.agents = agents);
  // }

  // selectAgent(agent: Agent): void {
  //   this.selectedAgent = { ...agent };
  //   this.showForm = true;
  // }

  // saveAgent(): void {
  //   // Before splitting, check if policyIds is a string
  //   const policyIds = typeof this.selectedAgent.policyIds === 'string'
  //     ? this.selectedAgent.policyIds.split(',').map((s: string) => s.trim())
  //     : this.selectedAgent.policyIds;
  
  //   const agentToSend: Agent = {
  //     ...this.selectedAgent,
  //     policyIds // policyIds is now guaranteed to be a string[] here
  //   };
  
  //   if (agentToSend.id) {
  //     this.agentService.updateAgent(agentToSend.id, agentToSend).subscribe(() => this.afterSave());
  //   } else {
  //     delete agentToSend.id; // Remove id property for new agents
  //     this.agentService.createAgent(agentToSend).subscribe(() => this.afterSave());
  //   }
  // }

  // deleteAgent(): void {
  //   if (this.selectedAgent.id) {
  //     this.agentService.deleteAgent(this.selectedAgent.id).subscribe(() => this.afterSave());
  //   }
  // }

  // afterSave(): void {
  //   this.loadAgents();
  //   this.showForm = false;
  //   this.selectedAgent = this.getEmptyAgent();
  // }

  // toggleForm(): void {
  //   this.showForm = !this.showForm;
  //   if (!this.showForm) {
  //     this.selectedAgent = this.getEmptyAgent();
  //   }
  // }
