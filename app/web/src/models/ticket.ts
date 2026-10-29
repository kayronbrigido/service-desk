export interface ITicket {
  title: string,
  description: string,
  requesterCompanyId: string,
  resolverCompanyId: string,
  openedByUser: string,
  status: ETicketStatus
}

export enum ETicketStatus {
  OPENED = 'OPENED',
  PENDING = 'PENDING',
  FINISHED = 'FINISHED',
}