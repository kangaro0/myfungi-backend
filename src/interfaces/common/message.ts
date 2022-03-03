
export default interface Message {
    type: "Error" | "Success";
    content: string | Array<string>; 
}