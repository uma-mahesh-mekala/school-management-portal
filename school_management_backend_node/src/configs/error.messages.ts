import { ErrorConstants } from './error.constants';

export interface ErrorMessage {
    code: string;
    message: string;
}

const ErrorMessages: ErrorMessage[] = [
    {
        code: ErrorConstants.INVALID_USERNAME_PASSWORD,
        message: 'Invalid username or password'
    }
];

// Additional messages
ErrorMessages.push(
    {
        code: ErrorConstants.USER_ALREADY_EXISTS,
        message: 'User already exists'
    },
    {
        code: ErrorConstants.COURSE_ALREADY_EXISTS,
        message: 'Course already exists'
    },
    {
        code: ErrorConstants.COURSE_NOT_FOUND,
        message: 'Course not found'
    },
    {
        code: ErrorConstants.STUDENT_NOT_FOUND,
        message: 'Student not found'
    },
    {
        code: ErrorConstants.PROFESSOR_NOT_FOUND,
        message: 'Professor not found'
    },
    {
        code: ErrorConstants.UNKNOWN_ERROR,
        message: 'Unknown error'
    },
    {
        code: ErrorConstants.INTERNAL_SERVER_ERROR,
        message: 'Internal server error'
    }
);

export default ErrorMessages;