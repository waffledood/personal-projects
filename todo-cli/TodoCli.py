from datetime import datetime
import json
import os
from pathlib import Path
import sys

INVALID_COMMAND = "Please enter a valid command: add, update, delete, mark-in-progress, mark-done, list"

CURRENT_DIRECTORY = os.path.dirname(os.path.realpath(__file__))
TASKS_JSON_FILE_NAME = "TodoCliTasks.json"
TASKS_JSON_FILE_PATH = os.path.join(CURRENT_DIRECTORY, TASKS_JSON_FILE_NAME)
TASKS_DICT = {}


class Task:
    numberOfTasksCount = 0

    def __init__(
        self, description, id=None, status="todo", createdAt=None, updatedAt=None
    ):

        self.id = id if id is not None else Task.numberOfTasksCount
        self.description = description
        self.status = "todo"  # Default status is 'todo'
        self.createdAt = datetime.now().isoformat()  # Set the creation time to now
        self.updatedAt = self.createdAt

        if id is None:
            Task.numberOfTasksCount += 1
        else:
            Task.numberOfTasksCount = id + 1

    def update_description(self, new_description):
        self.status = new_description
        self.updatedAt = datetime.now().isoformat()  # Update the updatedAt time

    def update_status(self, new_status):
        allowed_statuses = ["todo", "in-progress", "done"]
        if new_status in allowed_statuses:
            self.status = new_status
            self.updatedAt = datetime.now().isoformat()  # Update the updatedAt time
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
        ).to_dict()

    @classmethod
    def create(cls, description):
        return cls(description=description).to_dict()

    @classmethod
    def incrementNumberOfTasksCount(cls, id):
        if id > cls.numberOfTasksCount:
            cls.numberOfTasksCount = id + 1


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

    for task in tasks:
        Task.incrementNumberOfTasksCount(task["id"])

    global TASKS_DICT
    TASKS_DICT = {task["id"]: task for task in tasks}


def saveTasksToJson():
    taskJsonFromDict = [taskJson for taskJson in TASKS_DICT.values()]

    with open(TASKS_JSON_FILE_PATH, "w") as f:
        json.dump(taskJsonFromDict, f, indent=2)


def addNewTask(description):
    newTask = Task.create(description=description)
    newTaskId = newTask["id"]

    # Add new Task to dictionary
    TASKS_DICT[newTaskId] = newTask

    saveTasksToJson()


def updateExistingTask(id, description):
    try:
        taskToUpdate = TASKS_DICT[int(id)]
        taskToUpdate["description"] = description
    except KeyError:
        print(f"Task with id {id} doesn't exist")

    saveTasksToJson()


def deleteExistingTask(id):
    try:
        del TASKS_DICT[int(id)]
        saveTasksToJson()
    except KeyError:
        print("Specified id does not exist")


def markInProgress(id):
    try:
        taskToUpdate = TASKS_DICT[int(id)]
        taskToUpdate["status"] = "in-progress"
        saveTasksToJson()
    except KeyError:
        print("Specified id does not exist")


def markInDone(id):
    try:
        taskToUpdate = TASKS_DICT[int(id)]
        taskToUpdate["status"] = "done"
        saveTasksToJson()
    except KeyError:
        print("Specified id does not exist")


def main():
    initialization()
    loadTasksFromJson()

    if len(sys.argv) > 1:
        command = sys.argv[1]

        match command:
            case "add":
                newTaskDescription = sys.argv[2]
                addNewTask(description=newTaskDescription)

                return

            case "update":
                existingTaskId = sys.argv[2]
                existingTaskUpdatedDescription = sys.argv[3]
                updateExistingTask(
                    id=existingTaskId, description=existingTaskUpdatedDescription
                )

                return

            case "delete":
                existingTaskId = sys.argv[2]
                deleteExistingTask(id=existingTaskId)
                return

            case "mark-in-progress":
                existingTaskId = sys.argv[2]
                markInProgress(id=existingTaskId)
                return

            case "mark-done":
                existingTaskId = sys.argv[2]
                markInDone(id=existingTaskId)
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
