export type Locale = string;

export type Translations = Record<Locale, MessagesTree>;

export type MessagesTree<T = string> = {
  [key: string]: MessagesTree<T> | T;
};

export type FieldType = "short" | "long" | "rich";

export type MessageConfig =
  | FieldType
  | [type: FieldType, ...interpolations: string[]];

export type MessagesSchema = MessagesTree<MessageConfig>;
export type ResolvedMessagesSchema<T extends MessagesSchema> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends string[]
      ? `${string}${T[K][1]}${T[K][2]}${T[K][3]}${T[K][4]}${T[K][5]}${T[K][6]}`
      : T[K] extends MessagesSchema
        ? ResolvedMessagesSchema<T[K]>
        : never;
};
