import os
import sys

INVALID_COMMAND = "Please enter a valid command: add, update, delete, mark-in-progress, mark-done, list"


def main():
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
