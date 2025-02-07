/*
 *   I wanted to use the eventsourcing pattern here but legally its funniky to implement properly...
 *   I want to use OCR so i dont keep a transcript which might be argued to be stepping on copyrighted material...
 *   If instead i just highlight areas to be read by Optical character recognition i tend avoid this issue neatly
 *   but i cant really to command and actions becase a command does something and then stores the result as a event....
 *   so instead i am just gonna call them actions and action requests...  where i just keep the request bit as a batching reference if i wanna revert the action
 *
 *   Also i kinda want the editor to follow a mvc pattern where the model is a series of well basically events... kinda.. actions...
 *
 *   and the animated voiced client basically will be consumign these to replay the comic... rather then like project onto a view it will be replayed as a sequence
 */
export class ActionBase {
    Id;
    ActionName;
    SequenceNr;
}
export class ReadAloud extends ActionBase {
    constructor() {
        super();
        this.ActionName = ReadAloud.name;
    }
    X;
    Y;
    Width;
    Height;
    Voice;
    Override;
}
export class MoveTo extends ActionBase {
    constructor() {
        super();
        this.ActionName = MoveTo.name;
    }
    X;
    Y;
    Zoom;
    Speed;
    Effect;
}
//# sourceMappingURL=EditorModel.js.map