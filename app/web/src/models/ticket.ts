export interface ITicket {
  title: string,
  description: string,
  requesterCompanyId: string,
  resolverCompanyId: string,
  openedByUser: string,
  status: ETicketStatus
}

export enum ETicketStatus {
  OPENED = '1',
  PENDING = '2',
  FINISHED = '3',
}