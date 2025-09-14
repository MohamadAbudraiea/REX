export type ServiceType = "wash" | "dryclean" | "polish" | "nano" | "graphene";
export type StatusType = "requested" | "pending" | "finished" | "cancelled";

export interface User {
  id: string;
  created_at?: string;
  name: string;
  email: string;
  phone: string;
  role?: string;
  password?: string;
}

export interface Ticket {
  id: string;
  created_at: string;
  user: User;
  date: string | null;
  start_time: string | null;
  end_time: string | null;
  price: number | null;
  phone: string;
  service: ServiceType;
  status: StatusType;
  secretary_id: string | null;
  detailer_id: string | null;
  cancel_reason: string | null;
  rating: Rating | null;
}

export interface Rating {
  id: string;
  created_at: string;
  user_id: string;
  ticket_id: string;
  description: string;
  rating_number: number;
}

export type ErrorProps = {
  response: {
    data: {
      message: string;
    };
  };
};
