import { Dayjs } from 'dayjs';

export interface VagasProps {
    id: string;
    image: string;
    title: string;
    short_description: string;
    description: string;
    salary: string;
    location: string;
    type: string;
    level: string;
    expire_date: string;
    loading: boolean;
}

export interface Vagas {
    id: number;
    image: string;
    title: string;
    short_description: string;
    description: string;
    salary: number;
    city: string | null;
    state: string | null;
    type: string | null;
    level: string | null;
    expire_date: string | undefined;
    tecnical: boolean | undefined;
    personal: boolean | undefined;
    group_event: boolean | undefined;
    first_interview: boolean | undefined;
    final_interview: boolean | undefined;
    tecnical_date: string | undefined;
    personal_date: string | undefined;
    group_date: string | undefined;
    first_interview_date: string | undefined;
    final_interview_date: string | undefined;
}