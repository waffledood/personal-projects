from datetime import datetime
import json
import os
from pathlib import Path
import sys

INVALID_COMMAND = "Please enter a valid command: add, update, delete, mark-in-progress, mark-done, list"

CURRENT_DIRECTORY = os.path.dirname(os.path.realpath(__file__))
TASKS_JSON_FILE_NAME = "TodoCliTasks.json"
TASKS_JSON_FILE_PATH = os.path.join(CURRENT_DIRECTORY, TASKS_JSON_FILE_NAME)


class Task:
    numberOfTasksCount = 0

    def __init__(
        self, description, id=None, status="todo", createdAt=None, updatedAt=None
    ):

        self.id = id if id is not None else Task.numberOfTasksCount
        self.description = description
        self.status = "todo"  # Default status is 'todo'
        self.createdAt = datetime.now()  # Set the creation time to now
        self.updatedAt = self.createdAt

        if id is None:
            Task.numberOfTasksCount += 1
        else:
            Task.numberOfTasksCount = id + 1

    def update_description(self, new_description):
        self.status = new_description
        self.updatedAt = datetime.now()  # Update the updatedAt time

    def update_status(self, new_status):
        allowed_statuses = ["todo", "in-progress", "done"]
        if new_status in allowed_statuses:
            self.status = new_status
            self.updatedAt = datetime.now()  # Update the updatedAt time
        else:
            raise ValueError(f"Invalid status: {new_status}")

    def to_dict(self):
        return {
            "id": self.id,
            "description": self.description,
            "status": self.status,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }

    def __repr__(self):
        return f"Task(id={self.id}, description={self.description})"

    @classmethod
    def from_dict(cls, data):
        # Convert date strings back to datetime objects if needed
        createdAt = data.get("createdAt")
        updatedAt = data.get("updatedAt")

        # Create a Task instance using data from the dictionary
        return cls(
            id=data["id"],
            description=data["description"],
            status=data["status"],
            createdAt=createdAt,
            updatedAt=updatedAt,
        )


def initialization():
    if os.path.exists(TASKS_JSON_FILE_PATH):
        print(f"{TASKS_JSON_FILE_NAME} exists")
    else:
        print(f"{TASKS_JSON_FILE_NAME} does not exist, creating")
        with open(TASKS_JSON_FILE_PATH, "w") as f:
            emptyJson = []
            json.dump(emptyJson, f)


def loadTasksFromJson():
    with open(TASKS_JSON_FILE_PATH) as f:
        tasks = json.load(f)

    return tasks


def main():
    initialization()

    tasks = loadTasksFromJson()

    if len(sys.argv) > 1:
        command = sys.argv[1]

        match command:
            case "add":
                return

            case "update":
                return

            case "delete":
                return

            case "mark-in-progress":
                return

            case "mark-done":
                return

            case "list":
                return

            case _:
                print(INVALID_COMMAND)
    else:
        print(INVALID_COMMAND)
        return


if __name__ == "__main__":
    main()
