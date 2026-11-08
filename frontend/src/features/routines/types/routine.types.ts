export interface Routine {
    id: number;
    name: string;
}

export interface CreateRoutineDto {
    name: string;
}

export interface FluentValidationError {
    propertyName: string;
    errorMessage: string;
    attemptedValue?: unknown;
    errorCode?: string;
}