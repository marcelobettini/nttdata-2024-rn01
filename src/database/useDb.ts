import { ITodo } from "@/types/types";
import { useSQLiteContext } from "expo-sqlite";

export function useDb() {
  const database = useSQLiteContext();
  //get all records
  async function findAll() {
    try {
      const query = "SELECT * FROM tasks";
      const result = await database.getAllAsync<ITodo>(query);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  //search by text
  async function searchByDescription(text: string) {
    try {
      const query = "SELECT * FROM tasks WHERE description LIKE ?";
      const result = await database.getAllAsync<ITodo>(query, `%${text}%`);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  //create a record
  async function createOne(description: string) {
    const statement = await database.prepareAsync(
      "INSERT INTO tasks (description) VALUES ($description)"
    );
    try {
      const result = await statement.executeAsync({
        $description: description,
      });
    } catch (error) {
      console.error(error);
    }
  }

  //update record toggling isCompleted state
  async function toggleIsCompleted(id: number, newState: boolean) {
    try {
      const query = "UPDATE tasks SET isCompleted = ? WHERE id = ?";
      const result = await database.getFirstAsync(query, !newState, id);
    } catch (error) {
      console.error(error);
    }
  }

  //delete a record
  async function deleteOne(id: number) {
    try {
      // const result = await database.execAsync(`DELETE FROM tasks WHERE id = ${id}`) //esto es caca

      const query = "DELETE FROM tasks WHERE id = ?";
      const result = await database.getFirstAsync(query, id);
    } catch (error) {
      console.error(error);
    }
  }
  return {
    createOne,
    findAll,
    toggleIsCompleted,
    deleteOne,
    searchByDescription,
  };
}
