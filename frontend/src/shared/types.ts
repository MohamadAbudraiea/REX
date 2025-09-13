export type ServiceType = "wash" | "dryclean" | "polish" | "nano" | "graphene";
export type StatusType = "requested" | "pending" | "completed" | "canceled";

export interface User {
  id: string;
  created_at?: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  password: string;
}

export interface Ticket {
  id: number;
  created_at: string;
  user_id: string;
  date: string | null;
  start_time: string | null;
  end_time: string | null;
  price: number | null;
  service: ServiceType;
  status: StatusType;
  secretary_id: string | null;
  detailer_id: string | null;
  cancel_reason: string | null;
  rating: number | null;
}

export interface Rating {
  id: string;
  created_at: string;
  user_id: string;
  ticket_id: number;
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
