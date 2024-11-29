import TicketsAPI from "@src/endpoints/tickets/tickets";
import { ITicket } from "@src/models/ticket";
import { startLoading, stopLoading } from "@src/store/slicers/loadingSlice";

const TicketService = {

  createTicket: (ticketData: ITicket, callback?: (err: Error | null) => void ) => (dispatch: any) => {
    dispatch(startLoading());
    try {

      TicketsAPI.createTicket(ticketData);
      if(callback) callback(null);
      
    } catch (error) {
      if(callback && error instanceof Error ) callback(error);

    } finally {
      dispatch(stopLoading());
    }
  }

}

export default TicketService;