export type DeepReplace<Input, Target> = Input extends object
  ? Target extends Array<infer O>
    ? O extends object
      ? {
          [Key in keyof Input]: Key extends keyof O
            ? DeepReplace<Input[Key], O[Key]>
            : DeepReplace<Input[Key], O>;
        }
      : O
    : Target extends object
    ? {
        [Key in keyof Input]: Key extends keyof Target
          ? DeepReplace<Input[Key], Target[Key]>
          : Target;
      }
    : Target
  : Target;
