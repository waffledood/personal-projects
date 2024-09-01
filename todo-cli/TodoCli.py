import json
import os
from pathlib import Path
import sys

INVALID_COMMAND = "Please enter a valid command: add, update, delete, mark-in-progress, mark-done, list"

CURRENT_DIRECTORY = os.path.dirname(os.path.realpath(__file__))
TASKS_JSON_FILE_NAME = "TodoCliTasks.json"
TASKS_JSON_FILE_PATH = os.path.join(CURRENT_DIRECTORY, TASKS_JSON_FILE_NAME)


def initialization():
    if os.path.exists(TASKS_JSON_FILE_PATH):
        print(f"{TASKS_JSON_FILE_NAME} exists")
    else:
        print(f"{TASKS_JSON_FILE_NAME} does not exist, creating")
        with open(TASKS_JSON_FILE_PATH, "w") as f:
            emptyJson = {}
            json.dump(emptyJson, f)


def main():
    initialization()

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
