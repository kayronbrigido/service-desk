import { dataBase } from "@src/config/firebaseService";
import { Collections } from "@src/models/enums";
import { ITicket } from "@src/models/ticket"
import { addDoc, collection } from "firebase/firestore";

const THIS_COLLECTION = Collections.TICKET;

const createTicket = async (ticketData: ITicket) => {
  await addDoc(collection(dataBase, THIS_COLLECTION), ticketData);
}

const TicketsAPI = {
  createTicket
}

export default TicketsAPI;