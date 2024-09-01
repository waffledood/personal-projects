public class TodoCli {

    public static void main(String[] args) {
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
                    System.out.println("Please enter one of the following commands: add, update, delete, mark-in-progress, mark-done, list");
                    break;
            }
        }
    }
}