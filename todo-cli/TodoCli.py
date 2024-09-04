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

        self.id = Task.numberOfTasksCount if id is None else id
        self.description = description
        self.status = "todo"  # Default status is 'todo'
        self.createdAt = datetime.now().isoformat()  # Set the creation time to now
        self.updatedAt = self.createdAt

        if id is None:
            Task.numberOfTasksCount += 1
        else:
            Task.numberOfTasksCount = id + 1

    def to_dict(self):
        return {
            "id": self.id,
            "description": self.description,
            "status": self.status,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }

    @classmethod
    def create(cls, description):
        return cls(description=description).to_dict()

    @classmethod
    def incrementNumberOfTasksCount(cls, id):
        if id > cls.numberOfTasksCount:
            cls.numberOfTasksCount = id + 1

    @classmethod
    def str(cls, data):
        return f"Task [{data["id"]}](Status: {data["status"]}) - \"{data["description"]}\""


def initialization():
    if not os.path.exists(TASKS_JSON_FILE_PATH):
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


def updateTimestamp(task):
    task["updatedAt"] = datetime.now().isoformat()


def updateExistingTask(id, description):
    try:
        taskToUpdate = TASKS_DICT[int(id)]
        taskToUpdate["description"] = description
        updateTimestamp(task=taskToUpdate)
        saveTasksToJson()
    except KeyError:
        print(f"Task with id {id} doesn't exist")


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
        updateTimestamp(task=taskToUpdate)
        saveTasksToJson()
    except KeyError:
        print("Specified id does not exist")


def markInDone(id):
    try:
        taskToUpdate = TASKS_DICT[int(id)]
        taskToUpdate["status"] = "done"
        updateTimestamp(task=taskToUpdate)
        saveTasksToJson()
    except KeyError:
        print("Specified id does not exist")


def listBy(status=None):
    tasks = TASKS_DICT.values()

    if status != None:
        match status:
            case "done":
                tasks = [task for task in tasks if task["status"] == "done"]
            case "todo":
                tasks = [task for task in tasks if task["status"] == "todo"]
            case "in-progress":
                tasks = [task for task in tasks if task["status"] == "in-progress"]

    for task in tasks:
        print(Task.str(task))


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
                if len(sys.argv) == 3:
                    status = sys.argv[2]
                    listBy(status=status)
                elif len(sys.argv) == 2:
                    listBy(status=None)
                return

            case _:
                print(INVALID_COMMAND)
    else:
        print(INVALID_COMMAND)
        return


if __name__ == "__main__":
    main()
