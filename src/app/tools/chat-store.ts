import { generateId } from "ai";

export async function createChat(): Promise<string> {
  const id = generateId(); // generate a unique chat ID
  return id;
}
