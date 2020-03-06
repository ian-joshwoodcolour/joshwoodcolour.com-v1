declare module 'conversational-form' {
    declare type ConversationalFormOptions = {
        context: HTMLElement,
        formEl: HTMLFormElement,
        preventAutoFocus: boolean
    };

    declare class ConversationalForm {
        constructor(options: ConversationalFormOptions): void;
        static startTheConversation: Class<ConversationalForm>;
    }

    declare export default typeof ConversationalForm;
};
