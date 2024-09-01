import os
from pathlib import Path
import sys

INVALID_COMMAND = "Please enter a valid command: add, update, delete, mark-in-progress, mark-done, list"

CURRENT_DIRECTORY = os.path.dirname(os.path.realpath(__file__))
TASKS_JSON_NAME = "TodoCliTasks.json"


def initialization():
    tasksJsonPath = Path(CURRENT_DIRECTORY) / TASKS_JSON_NAME
    if tasksJsonPath.exists():
        print(f"{TASKS_JSON_NAME} exists")
    else:
        print(f"{TASKS_JSON_NAME} does not exist, creating")
        with open(os.path.join(CURRENT_DIRECTORY, TASKS_JSON_NAME), "w") as f:
            f.write("")


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
