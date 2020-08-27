import { User } from '../shared/user';

export class registrationInfo {
    success: boolean;
    page: number;
    total_pages: number;
    total_users: number;
    count: number;
    links: {
        next_url: string,
        prev_url: string;
    };
    users: User[]
} 