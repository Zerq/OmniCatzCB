import { ActionBase } from "./EditorModel.js";

export interface EditorModelLike {
   Events: Map<string, ActionBase>
   SelectedItem: string;
   selectedType: string;
}