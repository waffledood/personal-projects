import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class TodoCli {

    private static final String nameOfTodoCliTasksJsonFile = "TodoCliTasks.json";
    private static final String todoCliDirectory = "C:/TodoCli/";
    private static final String todoCliTasksJsonPath = todoCliDirectory + nameOfTodoCliTasksJsonFile;

    private static final String validCommandWarning = "Please enter a valid command: add, update, delete, mark-in-progress, mark-done, list";

    public static void main(String[] args) {

        taskJsonInit();

        if (args.length >= 1) {
            String command = args[0];

            System.out.println("Command: " + command);

            switch (command) {
                case "add":
                    break;

                case "update":
                    break;

                case "delete":
                    break;

                case "mark-in-progress":
                    break;

                case "mark-done":
                    break;

                case "list":
                    break;

                default:
                    System.out.println(validCommandWarning);
                    break;
            }
        } else {
            System.out.println(validCommandWarning);
        }
    }

    public static void taskJsonInit() {
        // Create the directory, if it doesn't exist
        Path todoCliDirectoryPath = Path.of(todoCliDirectory);
        boolean todoCliDirectoryExists = Files.exists(todoCliDirectoryPath);
        if (!todoCliDirectoryExists) {
            try {
                Path todoCliDirectoryCreated = Files.createDirectories(todoCliDirectoryPath.resolve(""));
                System.out.println("TodoCli directory created at: " + todoCliDirectoryCreated);
            } catch (IOException ioException) {
                System.out.println(ioException);
            }
        }

        // Create the JSON file, if it doesn't exist
        Path tasksJsonPath = Path.of(todoCliTasksJsonPath);
        boolean tasksJsonExists = Files.exists(tasksJsonPath);
        if (!tasksJsonExists) {
            try {
                Path tasksJsonCreated = Files.createFile(tasksJsonPath.resolve(""));
                System.out.println("JSON file created at: " + tasksJsonCreated);
            } catch (IOException ioe) {
                System.out.println(ioe);
            }
        }
    }

    // read & write to JSON files using the Jackson library
    // https://www.baeldung.com/jackson-object-mapper-tutorial
    // https://jenkov.com/tutorials/java-json/jackson-objectmapper.html
    // https://www.marcobehler.com/guides/java-files

    // compile & run this class with the following command in PowerShell:
    // clear; javac TodoCli.java; java TodoCli abc
}