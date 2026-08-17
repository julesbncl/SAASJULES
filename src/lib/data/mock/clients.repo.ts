import { ClientsRepository } from "../repository";
import { Client } from "../types";
import { mockClients } from "./fixtures";

let clientsStore: Client[] = [...mockClients];

export const mockClientsRepository: ClientsRepository = {
  async getAll(): Promise<Client[]> {
    return [...clientsStore];
  },

  async getById(id: string): Promise<Client | null> {
    const found = clientsStore.find((c) => c.id === id);
    return found ? { ...found } : null;
  },

  async create(clientData): Promise<Client> {
    const newClient: Client = {
      ...clientData,
      id: `cli_${Date.now()}`,
      createdAt: new Date().toISOString(),
      totalInvoiced: 0,
    };
    clientsStore.unshift(newClient);
    return { ...newClient };
  },

  async update(id: string, data: Partial<Client>): Promise<Client> {
    const index = clientsStore.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Client introuvable");
    clientsStore[index] = { ...clientsStore[index], ...data };
    return { ...clientsStore[index] };
  },

  async delete(id: string): Promise<boolean> {
    const initialLen = clientsStore.length;
    clientsStore = clientsStore.filter((c) => c.id !== id);
    return clientsStore.length < initialLen;
  },
};
