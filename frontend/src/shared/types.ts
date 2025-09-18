export type ServiceType = "wash" | "dryclean" | "polish" | "nano" | "graphene";
export type StatusType = "requested" | "pending" | "finished" | "canceled";

export interface User {
  id: string;
  created_at?: Date;
  name: string;
  email: string;
  phone: string;
  type?: string;
  password?: string;
}

export interface Ticket {
  id: string;
  created_at: Date;
  user: User;
  date: string | null;
  start_time: string | null;
  end_time: string | null;
  price: number | null;
  phone: string;
  service: ServiceType;
  status: StatusType;
  location: string;
  secretary: User | null;
  detailer: User | null;
  secretary_id: string | null;
  detailer_id: string | null;
  cancel_reason: string | null;
  rating: Rating | null;
}

export interface Rating {
  id: string;
  created_at: Date;
  user_id: string;
  ticket_id: string;
  description: string;
  rating_number: number;
}

export type AddUser = {
  name: string;
  email: string;
  phone: string;
  password: string;
  type: string;
};

export type EditUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  [key: string]: string;
};

export interface ScheduleItem {
  ticket_id: string;
  date: string;
  start: string;
  end: string;
  interval: string;
}
