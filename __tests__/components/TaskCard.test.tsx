
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        back: jest.fn(),
        refresh: jest.fn(),
    }),
}));

import { render, screen } from '@testing-library/react';
import { TaskCard } from '../../components/TaskCard';
import { TaskStatus } from '../../types';

const mockTask = {
    id: '1',
    title: 'Test Task',
    description: 'This is a test task',
    status: TaskStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date(),
};

describe('TaskCard', () => {
    it('renders task title and description', () => {
        render(<TaskCard task={mockTask} />);
        expect(screen.getByText('Test Task')).toBeInTheDocument();
        expect(screen.getByText('This is a test task')).toBeInTheDocument();
    });

    it('shows pending badge', () => {
        render(<TaskCard task={mockTask} />);
        expect(screen.getByText(TaskStatus.PENDING)).toBeInTheDocument();
    });
});
