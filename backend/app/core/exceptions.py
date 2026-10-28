class NexoraException(Exception):
    """Base exception for NEXORA system."""
    pass


class CycleDetectedError(NexoraException):
    """Raised when adding a prerequisite relationship would create a circular dependency (cycle) in the DAG."""
    def __init__(self, message: str, cycle: list = None):
        super().__init__(message)
        self.cycle = cycle or []


class ConceptNotFoundError(NexoraException):
    """Raised when a referenced concept does not exist in the graph or database."""
    pass


class InvalidPrerequisiteError(NexoraException):
    """Raised when a prerequisite relationship violates domain constraints (e.g. self-dependency)."""
    pass
